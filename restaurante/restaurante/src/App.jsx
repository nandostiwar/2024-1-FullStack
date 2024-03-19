import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Login from './components/inicio/Login';
import Admin from './components/admin/Admin';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Login/>}></Route>
        <Route path='/adminHome' element={<Admin/>}></Route>
        {/* <Route path='/adminHome' element={<Admin user={user}/>}></Route> */}
        {/* <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
