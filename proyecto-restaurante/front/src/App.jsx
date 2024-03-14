import { useState } from 'react'
import './App.css'
import Form from './componentes/Form';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        {/* <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
