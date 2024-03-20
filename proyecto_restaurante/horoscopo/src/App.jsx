import './App.css';
import Form from './components/Form';

import PrincipalHome from './components/PrincipalHome';

import MesasHome from './components/MesasHome';
import UsuariosHome from './components/UsuariosHome';
import ProductosHome from './components/ProductosHome';
import PedidosHome from './components/PedidosHome';

import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>

        <Route path='/principalHome' element={<PrincipalHome user={user}/>}></Route>

        <Route path='/MesasHome' element={<MesasHome user={user}/>}></Route>
        <Route path='/UsuariosHome' element={<UsuariosHome user={user}/>}></Route>
        <Route path='/ProductosHome' element={<ProductosHome user={user}/>}></Route>
        <Route path='/PedidosHome' element={<PedidosHome user={user}/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
