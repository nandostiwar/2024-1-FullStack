import './App.css';
import Login from './components/inicio/Login';
import MeseroHome from './components/mesero/MeseroHome';
import CocinaHome from './components/cocinero/CocinaHome';
import AdminHome from './components/admin/AdminHome';
import RegistroHome from './components/admin/RegistroHome';
import Productos from './components/admin/Productos';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Login callback={setUser}/>}></Route>
        <Route path='/meseroHome' element={<MeseroHome user={user}/>}></Route>
        <Route path='/cocinaHome' element={<CocinaHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path='/registroHome' element={<RegistroHome user={user}/>}></Route>
        <Route path='/productos' element={<Productos user={user}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

/*
 function Navigation(){
   return <nav>
     <ul>
       <li>
         <Link to="/userHome">userHome</Link>
       </li>
       <li>
         <Link to="/adminHome">adminHome</Link>
       </li>
     </ul>
   </nav>
 }
*/

export default App
