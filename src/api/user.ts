

// import debounce from 'lodash.debounce';
// import { User } from '../Home/Home';

export const fetchUser = async () => {
  try {
    // console.log('fetching...');
    const res = await fetch('http://localhost:3000/auth/user');
    const json = await res.json();
    await new Promise((resolve) => { setTimeout(resolve, 500); });
    
    // console.log('response: ', json);
    return json;
    
  } catch (err) {
    console.log('Error: No user found.');
    return null;
  }
};
