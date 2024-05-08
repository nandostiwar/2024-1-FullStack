import './App.css';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
