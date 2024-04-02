import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Login callback={setUser}/>}></Route>
        <Route path='/dashboard' element={<Dashboard user={user}/>}></Route>
        <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
