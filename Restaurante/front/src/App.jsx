import './App.css';
import Form from './components/Form.jsx';
import Admin from './components/Admin.jsx'  ;
import Cocina from './components/Cocina.jsx';
import Mesero from './components/Mesero.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      {/*<Navigation/>*/}
      <Routes>
        <Route index element={<Form callback={setUser} />}></Route>
        <Route path="/Admin" element={<Admin user={user} />}></Route>
        <Route path="/Cocina" element={<Cocina  user={user} />}></Route>
        <Route path="/Mesero" element={<Mesero user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
