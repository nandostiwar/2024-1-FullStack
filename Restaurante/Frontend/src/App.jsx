import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Logueo from '../src/assets/components/login/Login'
import Sidebar from '../src/assets/components/Administrador/Admin'
import CrearUsuario from './assets/components/usuarios/CrearUsuario'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Logueo />} />
        <Route path="/admin" element={<Sidebar />} />
        <Route path="/admin/crear-usuario" element={<CrearUsuario />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
