# Tickersaver

## Getting Started

This app consumes Finnhub's Stock API. It's currently using the free tier which only allows 60 queries per minute. If you see any errors it is because you or someone else has used up the allotted 60 queries and will need to wait 1 minute for the cooldown to refresh. Each card represents 1 query since the free tier does not offer an API endpoint that allows for multiple stock symbols as a parameter. So each render is pretty expensive. If only a single card is not rendering, that means the API has blocked that data from being available to us through the free tier.

App Link - https://tickersaver.vercel.app/

**If you do not wish to sign up, here is a provided username and password.**

```
Username: apple
Password: Abcd1234!
```

## Screenshots

![Sign-Up](https://i.imgur.com/6K6UT3W.png)
![Dashboard](https://i.imgur.com/zpLvC8a.png)
![Search](https://i.imgur.com/NhsCR5Q.png)

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

- All pages are built responsively for mobile and desktop.
- Light/Dark theme.
- Persists data by saving users to MongoDB, then saving ticker symbols to documents in a tickers collection that references the current logged in user's user document, then makes API calls to Finnhub based on the ticker symbols from the tickers collection in MongoDB.
- Grabs company information and company quote information from Finnhub and displays them as cards.
- Finds percentage daily change based off calculations from previous day close price and current price.
- Updates Winners and Losers in real time.
- Updates Profile image in real time.
- Ability to upload a profile image to Cloudinary, then updates the current logged in user document's image prop with the Cloudinary URL. Sets the state that holds the profile image url every time you make a PUT request and on initial load.

---

- Sign-Up Page
  - Form built using Formik.
  - Form validations through Yup.
  - Grays out Sign-Up button if any validation errors occur.
  - Triggers modals based on server response when submitting the form.
  - If form successfully submits, then creates a user document in Mongo using Mongoose schema, then forwards the user to the login page.
- Login Page
  - Form built using Formik.
  - Form validations through Yup.
  - Grays out Login button if any validation errors occur.
  - Triggers modals based on server response when submitting the form.
  - If form successfully submits, forwards the user to the Dashboard page.
- Dashboard Page
  - User is able to upload a profile image by making a fetch request to cloudinary. If no error prop exists in the data received, then sets data received into client side states. Image url is set to an image state, which is used to make a PUT request to MongoDB through a custom RESTful API we created that's connected to our database. The PUT request will update the current logged in user document, and update an `image` prop on that user document.
  - We then use the user object which was called earlier through a GET request on our API endpoint connected to MongoDB and placed in its own state. Then we use the image prop existing on that user state to set our image state. Now we can use that image state in our JSX to display our profile image.
  - Dashboard ticker cards are rendered based off a `tickers collection` that's located in our MongoDB which we fetch with the help of react query. Each ticker is a document that's referencing the current logged in user document's object id. We then store those tickers in a client side state, and map that state to make an API call on each individual ticker symbol to render out the individual cards. We make 2 API calls simultaneously on 2 API endpoints from Finnhub's Stock API for each ticker symbol. We receive back 2 different JSON objects, 1 for the company information and 1 for the company quote information. If the JSON object received is not empty, then we set the 2 JSON objects to their respective client side states to be used to display the needed information and do the needed calculations for the rendered cards.
  - To find the Winners and Losers, we fetch from Finnhub's Stock API. We make 2 API calls simultaneously on 2 API endpoints. We receive back 2 different JSON objects, 1 for the company information and 1 for the company quote information. We combine those 2 JSON objects by creating a custom object and append them into a client side state, while still keeping the current data in that state so we aren't just replacing the entire state. We use this state to do the Winners and Losers card calculations.
  - To update the Winners and Losers cards whenever we delete a card from the dashboard, it needs a client state that tracks the ticker symbol that we deleted which we then compare that deleted ticker symbol with the state object that we use to find the Winner or Loser. If the deleted ticker exists in any of the nested objects inside the state object, then we need to do a for loop that will have a temporary array to push all the ticker objects that don't contain a ticker prop that matches the deleted ticker symbol. Then set the state object that does the Winners and Losers calculations to the temporary array that is now an array of objects without the object that contained the deleted ticker. UseEffect automatically handles the updates and re-rendering once we set the new states so Winners and Losers will update dynamically every time a card gets deleted or added from our dashboard.
- Search Page
  - Form built using formik.
  - Form validations through Yup.
  - The search input makes an API call to Finnhub's API endpoint by replacing the stock symbol parameter with our search value on form submit.
  - The search input on submit makes 2 simultaneous API calls to 2 API endpoints, 1 for company information and 1 for company quote information. If the JSON object received is not empty, then we set the 2 JSON objects to their respective client side states. Else if the JSON object is empty, then it triggers a modal that will display an error.
  - Clicking on the `+` button on the rendered results card will make a POST request to our custom API endpoint that's connected to our MongoDB. That POST request will create a new document in our `tickers collection` which will be used on our dashboard. It will also trigger a modal with a success message with 2 buttons asking to return to either the dashboard or the search page.

## Blockers During Development but Eventually Solved

### Updating the Winners and Losers cards in real time.

The state object that the Winners and Losers were doing their calculations from was not removing the nested object that contained the deleted ticker prop. This was due to the state holding previous state data and appending new data, so the state was never being replaced. In order to solve this there were several steps involved.

1.  We had to place the deleted ticker symbol in a state every time we deleted a card.
2.  We had to compare the deleted ticker symbol with the state that the Winners and Losers calculation was based off of.
3.  Inside a useEffect hook, we 1st check if the deleted ticker state isn't an empty string. Then we create a temp variable holding the state object that the Winner and Loser calculations were based off of. We then create another temp variable that holds an empty array. We do a for loop that checks to see if the deleted ticker exists in any of the iterated objects. If it doesn't exist, then push those objects to the variable holding the empty array.
4.  Once the for loop is done, we set the state that the Winners and Losers is based off of with the new array. And we also set the state that holds the deleted ticker to an empty string so it won't keep triggering the for loop.
