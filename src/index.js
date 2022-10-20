import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// fetch('/config')
//   .then((response) => response.json())
//   .then((data) => {
//     const stripePromise = loadStripe(data.publishableKey);
    const stripePromise = loadStripe("pk_test_51KLn1XELXTBTHT9CJidJyEeAcBy5htyn5h1v7ZG3eJwSUgXJsntKF18kMRFeMkDwIbHubHgiE5qwQSIJOQ4g5Mx100xcB7mTbL");

    ReactDOM.render(
      <React.StrictMode>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </React.StrictMode>,
      document.getElementById('root')
    );
  // // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });