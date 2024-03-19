import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Login from './components/inicio/Login';
import Admin from './components/admin/platos/Admin';
import CrearUsuario from './components/admin/crear-usuario/CrearUsuario';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}></Route>
          <Route path='/platos' element={<Admin/>}></Route>
          <Route path='/cocina' element={<CrearUsuario/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
