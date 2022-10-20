import React, {useEffect, useState} from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [customer, setCustomer] = useState(null);
  const [secret, setSecret] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const url = '/create-customer';
    const url = '/api/v1/users/registration';
    const customer = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ACCESS_TOKEN'
      },
      body: JSON.stringify({
        // email: email,
        email: 'change_email_here@gmail.com',
        firstName: 'User',
        lastName: 'Userson',
        // password: 'Password1!',
        phoneNumber: '0123456789',
        registrationType: 'SOCIAL_IDENTITY_PROVIDER'
      }),
    }).then(r => r.json());

    if (customer) {
      return <Redirect to={{pathname: '/prices', search: `?customerId=${customer}`}}/>
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const secret = e.target.secret.value;

    const subscriptionData = {
      clientSecret: secret,
      subscriptionId: ''
    }

    setData(subscriptionData)
  }

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

  if (data) {


    return <Redirect to={{
      pathname: '/subscribe',
      state: data
    }} />
  }

  return (
    <main>
      <h1>Login or register</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
        </label>

        <button type="submit">
          Register
        </button>
      </form>

      <form onSubmit={handleLogin}>
        <label>
          Client secret
          <input
            type="text"
            name="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required/>
        </label>

        <button type="submit">
          Login
        </button>
      </form>
    </main>
  );
}

export default Register;