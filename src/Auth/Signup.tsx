import { FormEvent, useState } from 'react';
import './styles.scss';
import { signup } from '../api/signup';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      name,
      email,
      password,
    };
    signup(form);
  };

  return (
    <form className="signup-form" onSubmit={submit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div>
        <label htmlFor="name">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          name="confirm-password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
