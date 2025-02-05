import { sha256 } from "./crypto";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const secureForm = {
    ...data,
    // encryption is not required client side as long as client/server use TLS,
    // but this gives 1) extra peace of mind and 2) additional protection in case TLS is somehow terminated via 
    // "middleware" servers. (See pinned comment https://www.youtube.com/watch?v=fzwkkZp5WcE)
    password: await sha256(data.password),
  };

  return fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(secureForm),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw Error('Unable to sign up.');
      }
      return res.text()
    })
    .then(console.log)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
