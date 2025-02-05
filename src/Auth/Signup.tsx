import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import cn from 'classnames';

import { signup } from '../api/signup';
import './styles.scss';

export const Signup = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasErrors = false;
    const setError = (setter: (a: string) => void, errorMsg: string) => {
      setter(errorMsg);
      hasErrors = true;
    };

    if (!name) {
      setError(setNameError, 'Name is required!');
    }
    if (!email) {
      setError(setEmailError, 'Email is required!');
    }

    if (!password) {
      setError(setPasswordError, 'Password is required!');
    }

    if (!passwordConfirmation || passwordConfirmation !== password) {
      setError(
        setPasswordConfirmationError,
        'Password Confirmation must match password!',
      );
    }

    if (password.length < 8 || password.length > 64) {
      setError(
        setPasswordError,
        'Password must be between 8-64 characters long',
      );
    }

    if (hasErrors) {
      return;
    }

    try {
      const form = {
        name,
        email,
        password
      };
      await signup(form);
      return navigate('/login');
    } catch (err) {
      setNameError('Unable to signup.  Try again later!');
    }
  };

  const updateField = (
    value: string,
    setState: (a: string) => void,
    setError: (a: string) => void,
  ) => {
    setError('');
    setState(value);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={submit}>
        <div className={cn('form-element-container', nameError && 'error')}>
          <div className="error-msg">{nameError}</div>
          <div className="form-element-inner">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) =>
                updateField(e.target.value, setName, setNameError)
              }
            />
          </div>
        </div>

        <div className={cn('form-element-container', emailError && 'error')}>
          <div className="error-msg">{emailError}</div>
          <div className="form-element-inner">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) =>
                updateField(e.target.value, setEmail, setEmailError)
              }
            />
          </div>
        </div>

        <div className={cn('form-element-container', passwordError && 'error')}>
          <div className="error-msg">{passwordError}</div>
          <div className="form-element-inner">
            <label htmlFor="name">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) =>
                updateField(e.target.value, setPassword, setPasswordError)
              }
            />
          </div>
        </div>

        <div
          className={cn(
            'form-element-container',
            passwordConfirmationError && 'error',
          )}
        >
          <div className="error-msg">{passwordConfirmationError}</div>
          <div className="form-element-inner">
            <label htmlFor="name">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              value={passwordConfirmation}
              onChange={(e) =>
                updateField(
                  e.target.value,
                  setPasswordConfirmation,
                  setPasswordConfirmationError,
                )
              }
            />
          </div>
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
