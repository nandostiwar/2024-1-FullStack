import Form from './components/Form';
import Useradmin from './components/useradmin';
import Usermesero from './components/usermesero';
import Usercocina from './components/usercocina';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App(){
    const [user,setUser]=useState(null);
    return(
        <BrowserRouter>
        {/* <Navigation/> */}
            <Routes>
                <Route index element={<Form callback={setUser}/>}></Route>
                <Route path='/useradmin' element={<Useradmin user={user}/>}></Route>
                <Route path='/usermesero' element={<Usermesero user={user}/>}></Route>
                <Route path='/usercocina' element={<Usercocina user={user}/>}></Route>
                
            </Routes>
            
        </BrowserRouter>
    )
}

export default App;