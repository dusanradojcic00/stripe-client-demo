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