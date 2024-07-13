import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import List from './components/List';

import User from './components/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/users/:id" element={<User />}>
          <Route path='feed' element={<Feed />} />
          <Route path='userlist' element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
