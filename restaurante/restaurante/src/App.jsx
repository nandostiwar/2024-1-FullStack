import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Login from './components/inicio/Login';
import Admin from './components/admin/platos/Admin';
import CrearUsuario from './components/admin/crear-usuario/CrearUsuario';
import MeseroModule from './components/mesero/Mesero';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
    <div className='contenedor-componentes'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}></Route>
          <Route path='/platos' element={<Admin/>}></Route>
          <Route path='/cocina' element={<CrearUsuario/>}></Route>
          <Route path='/mesero' element={<MeseroModule/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App;
