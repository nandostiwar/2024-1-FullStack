import './App.css';
import Form from './components/Form';
import HomeAdmin from './components/homeAdmin';
import HomeCocina from './components/homeCocina';
import HomeMesero from './components/homeMesero';
import AdminS from './components/modulos/admins';
import AdminU from './components/modulos/adminu';
import AdminI from './components/modulos/admini';
import ConsultaM from './components/modulos/consultam';
import ConsultaP from './components/modulos/consultap';
import HistorialP from './components/modulos/historialp';
import MDisponible from './components/modulos/mdisponible';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser} />} />
        <Route path='/homeAdmin' element={<HomeAdmin user={user}/>}></Route>
        <Route path='/homeAdmin/modulos/admini' element={<AdminI user={user}/>}></Route>
        <Route path='/homeAdmin/modulos/adminu' element={<AdminU user={user}/>}></Route>
        <Route path='/homeAdmin/modulos/admins' element={<AdminS user={user}/>}></Route>

        <Route path='/homeCocina' element={<HomeCocina user={user}/>}></Route>
        <Route path='/homeCocina/modulos/historialp' element={<HistorialP user={user}/>}></Route>

        <Route path='/homeMesero' element={<HomeMesero user={user}/>}></Route>
        <Route path='/homeMesero/modulos/consultap' element={<ConsultaP user={user}/>}></Route>
        <Route path='/homeMesero/modulos/mdisponible' element={<MDisponible user={user}/>}></Route>
        <Route path='/homeMesero/modulos/consultam' element={<ConsultaM user={user}/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

