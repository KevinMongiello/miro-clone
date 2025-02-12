import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import BoardCard from './BoardCard/BoardCard';
import { NewBoardCard } from './NewBoardCard';
import { fetchUser } from '../../api/user';

import './Home.scss';
import { logout } from '../../api/login';
import Board from '../../components/Board/Board';
import { createNewBoard, fetchBoards } from '../../api/boards';

export interface User {
  name: string;
  id: string;
}

// @ts-ignore
export const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState<Board[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [boardsLoading, setBoardsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      const user = await fetchUser();
      if (!user) {
        return navigate('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fn();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fn = async () => {
      setBoardsLoading(true);
      const boards = await fetchBoards();
      setBoards(boards || []);
      setBoardsLoading(false);
    };
    fn();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      // notification
      console.log(err);
    }
  };

  const onNewBoard = useCallback(async () => {
    const newBoard = await createNewBoard();
    setBoards([...(boards || []), newBoard]);
  }, []);

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
            {boardsLoading ? (
              <h3>Loading...</h3>
            ) : (
              <div className="cards">
                <NewBoardCard onNewBoard={onNewBoard} />
                {boards?.map((board, id) => (
                  <BoardCard board={board} key={id} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Redirecting to signup...</p>
        )}
      </div>
    </div>
  );
};
