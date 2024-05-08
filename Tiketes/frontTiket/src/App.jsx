import './App.css'; 
import Home from './assets/Components/home.jsx'  ;
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      {/*<Navigation/>*/}
      <Routes>
        <Route index element={<Home callback={setUser} />}></Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App
