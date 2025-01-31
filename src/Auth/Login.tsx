import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { login } from '../api/login';
import './styles.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      email,
      password,
    };
    try {
      await login(form);
      return navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={submit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>
          New around these parts? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};
