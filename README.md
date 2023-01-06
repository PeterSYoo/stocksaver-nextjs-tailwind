# Tickersaver

## Getting Started

This app consumes the Finnhub Stock API, which is currently using the free tier that allows only 60 queries per minute. If you encounter errors, it may be because you or someone else has used up the allotted queries and must wait for the cooldown period to refresh. Each card represents one query, as the free tier does not offer an API endpoint that allows multiple stock symbols as a parameter. Therefore, each render is expensive. If a single card is not rendering, it means that the API has blocked the data from being available through the free tier.

App Link: https://tickersaver.vercel.app/

**If you do not want to sign up, you can use the following provided username and password:**

```
Username: apple
Password: Abcd1234!
```

## Screenshots

![Sign-Up](https://i.imgur.com/O23M41A.png)
![Dashboard](https://i.imgur.com/UVltCrx.png)
![Search](https://i.imgur.com/iDALrNu.png)

## Video Demo

[![demo](https://img.youtube.com/vi/E1rv0ZqCx74/maxresdefault.jpg)](https://www.youtube.com/watch?v=E1rv0ZqCx74)

## Wireframes

![figma](https://i.imgur.com/IeV4RtS.png)
https://www.figma.com/file/wHm2hDPB9OzMQ5fIwtTAZo/Stocksaver?t=3IhUZzxMuo8z6sZF-0

## Database Models

User [one : many] Ticker

## Technologies Used

- TypeScript
- NextJS
- NextAuth
- MongoDB
- Mongoose
- Bcrypt
- Tailwind CSS
- React Query
- Formik
- Yup
- Finnhub's Stock API
- Cloudinary

## App Features

- Responsive on both mobile and desktop devices.
- Implemented secure server-side routing to protect user access and redirect as needed.
- Includes a light/dark theme.
- Persists data by saving users to MongoDB, storing ticker symbols in a "tickers" collection that references the current logged-in user's document, and making API calls to Finnhub based on the ticker symbols in the "tickers" collection.
- Retrieves company information and company quote data from Finnhub and displays them as cards.
- Calculates the daily percentage change based on the previous day's close price and the current price.
- Updates the "Winners" and "Losers" lists in real time.
- Updates the profile image in real time.
- Users can upload a profile image to Cloudinary and update the current logged-in user's document with the Cloudinary URL. The app sets the state that holds the profile image URL every time a PUT request is made and on initial load.

---

- Sign-Up Page
  - Form built using Formik with form validations through Yup.
  - The Sign-Up button is disabled if any validation errors occur.
  - The form triggers modals based on the server response upon submission.
  - If the form is successfully submitted, a user document is created in MongoDB using a Mongoose schema, and the user is forwarded to the login page.
- Login Page
  - Form built using Formik with form validations through Yup.
  - The Login button is disabled if any validation errors occur.
  - The form triggers modals based on the server response upon submission.
  - If the form is successfully submitted, the user is forwarded to the Dashboard page.
- Dashboard Page
  - The user can upload a profile image by making a fetch request to Cloudinary. If there is no error prop in the received data, the data is set into client-side states. The image URL is set to an image state, which is used to make a PUT request to MongoDB through a custom REST API. The PUT request updates the current logged-in user's document and updates the image prop on that document.
  - The app fetches the user object from the API endpoint connected to MongoDB and places it in its own state. It then uses the image prop on the user state to set the image state, which is then used to display the profile image in the JSX.
  - Ticker cards are displayed on the dashboard based on the ticker documents in the "tickers" collection in MongoDB. Each ticker document is associated with the current logged-in user's document ID. The ticker documents are stored in a client-side state, and the state is mapped to make API calls on Finnhub's Stock API for each individual ticker symbol. Two API calls are made simultaneously to two API endpoints for each ticker symbol, and the resulting JSON objects (one for company information and one for company quote information) are stored in their respective client-side states if they are not empty. The stored JSON objects are used to display the necessary information and perform the necessary calculations for the ticker cards.
  - The Winners and Losers are determined by making two API calls simultaneously to Finnhub's Stock API and receiving back two JSON objects (one for company information and one for company quote information). These JSON objects are combined into a custom object and added to a client-side state, while also preserving the current data in the state. This state is used to calculate the Winners and Losers cards. When a card is deleted from the dashboard, a client-side state tracks the deleted ticker symbol and compares it to the state object used to determine the Winners and Losers. If the deleted ticker exists in any nested objects within the state object, a loop is used to create a temporary array containing all ticker objects without the deleted ticker symbol. The state object used for calculating the Winners and Losers is then updated with the temporary array, and the updates and re-rendering are handled automatically by the useEffect hook, ensuring that the Winners and Losers are updated dynamically every time a card is added or removed from the dashboard.
- Search Page
  - The Search Page has a form built using Formik with validations through Yup.
  - When the search input is submitted, it makes an API call to Finnhub's API endpoint, replacing the stock symbol parameter with the search value.
  - The search input submission also makes 2 simultaneous API calls to 2 API endpoints, one for company information and one for company quote information.
  - If the received JSON objects are not empty, they are set to their respective client-side states. If the JSON objects are empty, a modal with an error message is triggered.
  - When the + button on a rendered results card is clicked, a POST request is made to a custom API endpoint connected to the MongoDB. This creates a new document in the tickers collection and triggers a modal with a success message and buttons to return to the dashboard or search page.

## Blockers During Development but Eventually Solved

### Updating the Winners and Losers cards in real time.

The Winners and Losers were using a state object that was not properly removing the nested object with the deleted ticker property. This was because the state was simply adding new data to the previous state, rather than replacing it. To fix this issue, several steps were required.

1. A state was created to hold the deleted ticker symbol every time a card was deleted.
2. The deleted ticker symbol was compared with the state object used for the Winner and Loser calculations.
3. Inside a useEffect hook, a temporary variable was created to hold the state object used for the Winner and Loser calculations. Another temporary variable was also created to hold an empty array. A for loop was used to check if the deleted ticker symbol existed in any of the iterated objects. If it did not exist, the objects were pushed to the empty array variable.
4. Once the for loop completed, the state object used for the Winner and Loser calculations was updated with the new array. The state holding the deleted ticker symbol was also set to an empty string to prevent the for loop from being triggered again.
