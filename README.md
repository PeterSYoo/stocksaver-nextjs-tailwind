# Tickersaver

## Getting Started

This app consumes Finnhub's Stock API. It's currently using the free tier which only allows 60 queries per minute. If you see any errors it is because you or someone else has used up the allotted 60 queries and will need to wait 1 minute for the cooldown to refresh. Each card represents 1 query since the free tier does not offer an API endpoint that allows for multiple stock symbols as a parameter. So each render is pretty expensive. If only a single card is not rendering, that means the API has blocked that data from being available to us through the free tier.

App Link - https://tickersaver.vercel.app/

## Screenshots

![Sign-Up](https://i.imgur.com/6K6UT3W.png)
![Dashboard](https://i.imgur.com/zpLvC8a.png)
![Search](https://i.imgur.com/NhsCR5Q.png)

## Technologies Used

- TypeScript
- NextJS
- MongoDB
- Mongoose
- Tailwind CSS
- React Query
- Formik
- Yup
- Finnhub's Stock API

## App Features

All pages are built responsively for mobile and desktop.

- Sign-Up Page
  - Form built using Formik.
  - Form validations through Yup.
  - Triggers modals based on server response when submitting the form.
  - If form succesfully submits, then creates a user document in Mongo using Mongoose schema, then forwads user to login page.
- Login Page
  - Form built using Formik.
  - Form validations through Yup.
  - Triggers modals based on server response when submitting the form.
  - If form succesfully submits, forwards user to Dashboard page.
- Dashboard Page
  - User is able to upload a profile image by making a fetch request to cloudinary. If no error prop exists in the data received, then sets data received into client side states. Image url is set to an image state, which is used to make a PUT request to MongoDB through a custom RESTful API we created that's connected to our database. The PUT request will update the current logged in user document, and update an `image` prop on that user document.
  - We then use the user object which was called earlier through a GET request on our API endpoint connected to MongoDB and placed in its own state. Then we use the image prop existing on that user object to set our image state. Now we can use that image state in our JSX to display our profile image.
  - Dashboard ticker cards are rendered based off a `tickers collection` that's located in our MongoDB which we fetch with the help of react query. Each ticker is a document that's referencing the current logged in user document's object id. We then store those tickers in a client side state, and map that state to do an API call on each individual ticker symbol to render out the individual cards. We make 2 API calls simultaneously on 2 API endpoints from Finnhub's Stock API for each ticker symbol. We receive back 2 different JSON objects, 1 for the company information and 1 for the company quote information. If the JSON object receieved is not empty, then we set the 2 JSON objects to their respective client side states to be used to display the needed information and do the needed calculations for the rendered cards.
  - To find the Winners and Losers, we fetch from Finnhub's Stock API. We make 2 API calls simultaneously on 2 API endpoints. We receive back 2 different JSON objects, 1 for the company information and 1 for the company quote information. We combine those 2 JSON objects by creating a custom object and appending them into a client side state, while still keeping the current data in that state so we aren't just replacing the entire state. We use this state to do the Winners and Losers card calculations.
  - To update the Winners and Losers cards whenever we delete a card from the dashboard, it needs to a client state that tracks the ticker symbol that we deleted. We then compare that ticker symbol with the state object that we use to find the Winner or Loser. If the deleted ticker exists in that state object, then we need to do a for loop that will have a temporary array to push all the ticker objects that doesn't contain a ticker prop that matches the deleted ticker symbol. Then set the state object that does the Winners and Losers calculations to the temporary array that is now an array of objects without the object that contained the deleted ticker. UseEffect should automatically do the updates once we set the new states so Winners and Losers will update dynmically every time a card gets deleted or added from our dashboard.
- Search Page
  - Form built using formik.
  - Form validations through Yup.
  - The search input makes an API call to Finnhub's API endpoint by replacing the stock symbol parameter with our search value on form submit.
  - The search input on submit makes 2 simultaneous API calls to 2 API endpoints, 1 for company information and 1 for company quote information. If the JSON object receieved is not empty, then we set the 2 JSON objects to their respective client side states. Else if the JSON object is empty, then it triggers a modal that will display an error.
  - Clicking on the `+` button on the rendered results card will make a POST request to our custom API endpoint that's connect to our MongoDB. That POST request will create a new document inside our `tickers collection` which will be used on our dashboard. It will also trigger a modal with a success message with 2 buttons asking to return to either the dashboard or the search page.
