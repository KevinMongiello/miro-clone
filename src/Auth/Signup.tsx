import { FormEvent, useState } from 'react';
import './styles.scss';
import { signup } from '../api/signup';
import { Link, useNavigate } from 'react-router';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      name,
      email,
      password,
    };
    try {
      await signup(form);
      return navigate('/login');
    } catch (err) {
      console.log('Unable to signup.  Try again later!');
    }
  };

  return (
    <div className='signup-container'>
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
      <div>
        <p>
          Already signed up? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
};
