import React from 'react';
import { Route, Routes } from "react-router-dom";
import Board from './Board/Board';
import KeyboardListener from './Board/KeyboardListener/KeyboardListener';
import BoardCard from './Menu/BoardCard';
import './home.css'

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
const Home = () => {
  return (
    <div className="box">
      <BoardCard board={boards[0]} />
      <BoardCard board={boards[1]} />
      <BoardCard board={boards[2]} />
    </div>
  )
}

function App() {
  const board = (
    <KeyboardListener>
      {/*
        // @ts-ignore */}
      <Board />
    </KeyboardListener>
  );

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/board/:id' element={board} />
    </Routes>
  );
}

export default App;
