import './App.css';
import Meseros from './components/Meseros';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ListaPedidos from './components/ListaPedidos';
import AdminDashboard from './components/AdminDashboard';
import Productos from './components/Productos';
import Usuarios from './components/usuarios';


function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Login callback={setUser} />}></Route>
        <Route path='/Admin' element={<AdminDashboard user={user} />}></Route>
        <Route path='/Mesero' element={<Meseros user={user} />}></Route>
        <Route path='/Cosinero' element={<ListaPedidos user={user} />}></Route>
        <Route path='/Productos' element={<Productos user={user} />}></Route>
        <Route path='/Usuarios' element={<Usuarios user={user} />}></Route>
        <Route path='/ListaPedidos' element={<ListaPedidos user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
