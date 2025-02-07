import { sha256 } from './crypto';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const secureForm = {
    ...data,
    password: await sha256(data.password),
  };
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(secureForm),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      return;
    } else if (res.status === 204) {
      throw Error('Invalid login information');
    } else if (res.status === 500) {
      throw Error('Unable to login. Try again later');
    }
  } catch (err) {
    console.log(err);
    throw err;
    // throw 'Unable to login.  Please try again later!';
  }
};

export const logout = () => {
  return fetch('/api/auth/logout', {
    method: 'POST',
  });
};
