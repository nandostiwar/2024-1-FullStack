import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { useState } from 'react';
import Form from './components/Form';


function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}


function Navigation(){
return <nav>
//     <ul>
//       <li>
//         <Link to="/userHome">userHome</Link>
//       </li>
//       <li>
//         <Link to="/adminHome">adminHome</Link>
//      </li>
<li>
//         <Link to="/UserHomecocina">UserHomeCocina</Link>
//      </li>
//     </ul>
   </nav>
}

export default App
