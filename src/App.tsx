import React from 'react';
import { Route, Routes } from "react-router-dom";
import Board from './Board/Board';
import KeyboardListener from './Board/KeyboardListener/KeyboardListener';
import { Home } from './Home/Home';

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
