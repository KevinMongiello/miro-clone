interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signup = (data: SignupData) => {
  return fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.text())
    .then(console.log)
    .catch(console.error);
};
