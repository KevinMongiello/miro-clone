import React from 'react';
import BoardCard from './BoardCard/BoardCard';
import { NewBoardCard } from './NewBoardCard';
import './Home.css';

const boards = [
  {
    id: 1,
    name: "Board 1",
    user: "Ben",
  },
  {
    id: 2,
    name: "Board 2",
    user: "Jen",
  },
  {
    id: 3,
    name: "Board 3",
    user: "Glen",
    },
  ]

// @ts-ignore
export const Home = () => {
  return (
    <div id='home'>
      <div className='content'>
        <h2>Recent Boards</h2>
        <div className='cards'>
          <NewBoardCard />
          <BoardCard board={boards[0]} />
          <BoardCard board={boards[1]} />
          <BoardCard board={boards[2]} />
        </div>
      </div>
    </div>
  )
}