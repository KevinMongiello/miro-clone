import { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router';

import BoardCard from './BoardCard/BoardCard';
import { NewBoardCard } from './NewBoardCard';
import { fetchUser } from '../api/user';

import './Home.css';

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
        return navigate('/signup');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fn();
  }, []);

  return (
    <div id="home">
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
        ) : <p>Redirecting to signup...</p>}
      </div>
    </div>
  );
};
