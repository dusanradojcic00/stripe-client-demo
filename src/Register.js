import React, {useEffect, useState} from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [customer, setCustomer] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const url = '/create-customer';
    const url = '/api/v1/users/registration';
    const customer = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJraWQiOiJxMEl0SjhJdWJmMEJCSUlqcFJxOHV3ZmV3bGo2akFYd2cwaVVyaU9VM3BRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZTM2NzRlMC03YTFmLTQ2YWUtYTUyYy1kMTBmYTNjMThhYTkiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfNnRoWHhkQ1FLX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl82dGhYeGRDUUsiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2a2tsdjZ0Zzg4N25wbHVndW5jajZrNWs1NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NjYxODIxMjgsImV4cCI6MTY2NjE4NTcyOCwiaWF0IjoxNjY2MTgyMTI4LCJqdGkiOiJlMjBhZTU2ZS03MmQxLTRlNzAtYWZhYi00NmVmMDhmMTBhOWUiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTcyMzc0MjU0Nzg1MzE3NDE1NDIifQ.OKQwVySopXDsOUBKeG9Ifh8Zd7IlKydmluPreuGalU2coNEAwxy4_35SXak-0QJyegP8gZOyvc-d8cdJWSJHDb4W6x1CyvOXxktyhc4kt1kZvzgg-DsnkXr2e9dc6d0pjEWXuuDZrBGIyThx-Evv1OkCEiNWpCg6oa6gpolEejs9MwwxeCCBiTxNoD0N__rXxDTMizeE6lSgUQ8JYNuqCKMpFfy-LoZmhEfD29-sSliZQLXpoJtd1BkguuP34yMMsmcHJPYnFZnyuqr9VhEt4YTPYGOlfMEc1W-GngpYv1C_dbCD6X7axiGTK1ObVfIgbAi1fCdwkRTd6GtdgWzL8w'
      },
      body: JSON.stringify({
        // email: email,
        email: 'dusanradojcic00@gmail.com',
        firstName: 'User',
        lastName: 'Userson',
        // password: 'Password1!',
        phoneNumber: '0123456789',
        registrationType: 'SOCIAL_IDENTITY_PROVIDER'
      }),
    }).then(r => r.json());

    setCustomer(customer);
  };

  const generateEmail = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    const randomUserName = new Array(8).fill("").map(e => characters.charAt(Math.floor(Math.random() *
        charactersLength))).join('');
    return `${randomUserName}@parkerandace.com`;
  }

  useEffect(() => {
    setEmail(generateEmail());
  }, [])

  if(customer) {
    return <Redirect to={{pathname: '/prices', search: `?customerId=${customer}`}} />
  }

  return (
      <main>
        <h1>Sample Photo Service</h1>

        <img src="https://picsum.photos/280/320?random=4" alt="picsum generated" width="140" height="160" />

        <p>
          Unlimited photo hosting, and more. Cancel anytime.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
          </label>

          <button type="submit">
            Register
          </button>
        </form>
      </main>
  );
}

export default Register;