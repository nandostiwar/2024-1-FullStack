import { useState } from 'react';
import './App.css';
import Tiquete from './components/Tiquete';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Tiquete />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
