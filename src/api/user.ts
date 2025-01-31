// import debounce from 'lodash.debounce';
// import { User } from '../Home/Home';

export const fetchUser = async () => {
  try {
    // console.log('fetching...');
    const res = await fetch('/api/auth/user');
    const json = await res.json();
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    return json;
  } catch (err) {
    console.log('Error: No user found.');
    return null;
  }
};
