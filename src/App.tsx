import { Route, Routes } from "react-router";
import Board from './Board/Board';
import KeyboardListener from './Board/KeyboardListener/KeyboardListener';
import { Home } from './Home/Home';
import { Route404 } from "./404";
import { Signup } from "./Auth/Signup";

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
      <Route path='/board/:id' element={board} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<Home />} />
      <Route path="/*" element={<Route404 />} />
    </Routes>
  );
}

export default App;
