interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      return;
    } else if (res.status === 204) {
      throw Error('Invalid login information');
    } else if (res.status === 500) {
      throw Error('Something went wrong. Try again later');
    }
  } catch (err) {
    console.log(err);
    // throw 'Unable to login.  Please try again later!';
  }
};

export const logout = () => {
  return fetch('/api/auth/logout', {
    method: 'POST',
  });
};
