import { Route, Routes } from 'react-router';
import { Home } from './Home/Home';
import { Route404 } from './404';
import { Signup } from './Auth/Signup';
import { Login } from './Auth/Login';
import { BoardContainer } from './Board/BoardContainer';

function App() {
  return (
    <Routes>
      <Route path="/board/:id" element={<BoardContainer />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<Route404 />} />
    </Routes>
  );
}

export default App;
