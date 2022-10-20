import React, { useState, useEffect } from 'react';
import {useLocation, withRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Prices = () => {
  const [prices, setPrices] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [customerId, setCustomerId] = useState();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  useEffect(() => {
    const fetchPrices = async () => {
      // const url = '/config';
      const url = '/api/v1/payments/subscriptions/price?speciesIds=1&speciesIds=11';
      const prices = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ACCESS_TOKEN'
        }
      }).then(r => r.json());
      setPrices(prices);
    };
    customerId && fetchPrices();
  }, [customerId])

  useEffect(() => {
    const cid = query.get("customerId");
    setCustomerId(cid);
  }, [])

  const createSubscription = async (price) => {
    // const url = '/create-subscription';
    const url = `/api/v1/payments/users/${customerId}/subscriptions`;
    const {subscriptionId, clientSecret} = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ACCESS_TOKEN'
      },
      body: JSON.stringify({
        "customerRequest": {
          "address": "Street Name Street Number 123",
          "city": "Customer City",
          "state": "Customer State",
          "country": "Customer Country",
          "postalCode": "123456"
        },
        "pricesRequests": [
          {
            "id": price.id,
            "currency": price.currency,
            "quantity": 1
          }
        ]
      }),
    }).then(r => r.json());

    setSubscriptionData({ subscriptionId, clientSecret });
  }

  if(subscriptionData) {
    return <Redirect to={{
      pathname: '/subscribe',
      state: subscriptionData
    }} />
  }

  return (
      <div>
        <h1>Select a plan</h1>

        <div className="price-list">
          {prices.map((price) => {
            return (
                <div key={price.id}>
                  <h3>{price.lookupKey}</h3>

                  <p>
                    ${price.unitAmount / 100} / ${price.recurringInterval}
                  </p>

                  <button onClick={() => createSubscription(price)}>
                    Select
                  </button>
                </div>
            )
          })}
        </div>
      </div>
  );
}

export default withRouter(Prices);