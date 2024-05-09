import Tiketes from './componentes/tiketes';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Tiketes />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App