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
          'Authorization': 'Bearer eyJraWQiOiJxMEl0SjhJdWJmMEJCSUlqcFJxOHV3ZmV3bGo2akFYd2cwaVVyaU9VM3BRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZTM2NzRlMC03YTFmLTQ2YWUtYTUyYy1kMTBmYTNjMThhYTkiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfNnRoWHhkQ1FLX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl82dGhYeGRDUUsiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2a2tsdjZ0Zzg4N25wbHVndW5jajZrNWs1NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NjYxODIxMjgsImV4cCI6MTY2NjE4NTcyOCwiaWF0IjoxNjY2MTgyMTI4LCJqdGkiOiJlMjBhZTU2ZS03MmQxLTRlNzAtYWZhYi00NmVmMDhmMTBhOWUiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTcyMzc0MjU0Nzg1MzE3NDE1NDIifQ.OKQwVySopXDsOUBKeG9Ifh8Zd7IlKydmluPreuGalU2coNEAwxy4_35SXak-0QJyegP8gZOyvc-d8cdJWSJHDb4W6x1CyvOXxktyhc4kt1kZvzgg-DsnkXr2e9dc6d0pjEWXuuDZrBGIyThx-Evv1OkCEiNWpCg6oa6gpolEejs9MwwxeCCBiTxNoD0N__rXxDTMizeE6lSgUQ8JYNuqCKMpFfy-LoZmhEfD29-sSliZQLXpoJtd1BkguuP34yMMsmcHJPYnFZnyuqr9VhEt4YTPYGOlfMEc1W-GngpYv1C_dbCD6X7axiGTK1ObVfIgbAi1fCdwkRTd6GtdgWzL8w'
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
        'Authorization': 'Bearer eyJraWQiOiJxMEl0SjhJdWJmMEJCSUlqcFJxOHV3ZmV3bGo2akFYd2cwaVVyaU9VM3BRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZTM2NzRlMC03YTFmLTQ2YWUtYTUyYy1kMTBmYTNjMThhYTkiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfNnRoWHhkQ1FLX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl82dGhYeGRDUUsiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2a2tsdjZ0Zzg4N25wbHVndW5jajZrNWs1NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NjYxODIxMjgsImV4cCI6MTY2NjE4NTcyOCwiaWF0IjoxNjY2MTgyMTI4LCJqdGkiOiJlMjBhZTU2ZS03MmQxLTRlNzAtYWZhYi00NmVmMDhmMTBhOWUiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTcyMzc0MjU0Nzg1MzE3NDE1NDIifQ.OKQwVySopXDsOUBKeG9Ifh8Zd7IlKydmluPreuGalU2coNEAwxy4_35SXak-0QJyegP8gZOyvc-d8cdJWSJHDb4W6x1CyvOXxktyhc4kt1kZvzgg-DsnkXr2e9dc6d0pjEWXuuDZrBGIyThx-Evv1OkCEiNWpCg6oa6gpolEejs9MwwxeCCBiTxNoD0N__rXxDTMizeE6lSgUQ8JYNuqCKMpFfy-LoZmhEfD29-sSliZQLXpoJtd1BkguuP34yMMsmcHJPYnFZnyuqr9VhEt4YTPYGOlfMEc1W-GngpYv1C_dbCD6X7axiGTK1ObVfIgbAi1fCdwkRTd6GtdgWzL8w'
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