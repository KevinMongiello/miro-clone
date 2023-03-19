import React from 'react';
import Board from './Board/Board';
import KeyboardListener from './Board/KeyboardListener/KeyboardListener';
import {
  Route,
  Routes,
  Link
} from "react-router-dom";

// @ts-ignore
const Home = () => {
  // fetch user info
  // fetch boards
  return <ul>
    <li><Link to='board'>Board 1</Link></li>
    <li><Link to='board'>Board 2</Link></li>
    <li><Link to='board'>Board 3</Link></li>
  </ul>;
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
      <Route path='/board' element={board} />
    </Routes>
  );
}

export default App;
