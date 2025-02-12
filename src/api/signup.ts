interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  return fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw Error('Unable to sign up.');
      }
      return res.text();
    })
    .then(console.log)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
