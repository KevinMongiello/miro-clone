import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import BoardCard from './BoardCard/BoardCard';
import { NewBoardCard } from './NewBoardCard';
import { fetchUser } from '../api/user';

import './Home.scss';
import { logout } from '../api/login';

const boards = [
  {
    id: 1,
    name: 'Board 1',
    user: 'Ben',
  },
  {
    id: 2,
    name: 'Board 2',
    user: 'Jen',
  },
  {
    id: 3,
    name: 'Board 3',
    user: 'Glen',
  },
];

export interface User {
  name: string;
  id: string;
}

// @ts-ignore
export const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      const user = await fetchUser();
      console.log('user in useEffect: ', user);
      if (!user) {
        console.log('no user found. redirecting...');
        return navigate('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fn();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      // notification
      console.log(err);
    }
  };

  return (
    <div id="home">
      <nav>
        <ul>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
      <div className="content">
        {loading ? (
          <h2>Loading...</h2>
        ) : user ? (
          <>
            <h2>Recent Boards</h2>
            <div className="cards">
              <NewBoardCard />
              <BoardCard board={boards[0]} />
              <BoardCard board={boards[1]} />
              <BoardCard board={boards[2]} />
            </div>
          </>
        ) : (
          <p>Redirecting to signup...</p>
        )}
      </div>
    </div>
  );
};
