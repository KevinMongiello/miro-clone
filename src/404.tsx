import { Link } from 'react-router';

export const Route404 = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to={{ pathname: '/' }}>Go Home</Link>
    </div>
  );
};
