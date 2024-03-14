import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
 
    const validateUser = (event)=>{
        event.preventDefault();
        if(username === 'juan' && password === '123'){
            callback("mesero");
            goTo("/meseroHome");
        }else if(username === 'admin' && password==='123'){
            callback("admin");
            goTo("/adminHome");
        }else if(username === 'sebas' && password==="123"){
            callback("cocina");
            goTo("/cocinaHome");
        } else {
            console.log("Credenciales invalidas");
        }
        
    }
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro restaurante</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
        </form>
    )
}

export default Form;