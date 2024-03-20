import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
 
    const validateUser = (event)=>{
        event.preventDefault();
       if(username === 'admin' && password==='admin2024'){
            callback("admin");
            goTo("/principalHome");
        }else if(username === 'cocina' && password==='cocina2024'){
            callback("cocina");
            goTo("/principalHome");
        }else if(username === 'mesero' && password==='mesero2024'){
            callback("mesero");
            goTo("/principalHome");
        }else{
            alert("Credenciales incorrectas, por favor validar de nuevo!");
        }
    }

    return (

        <div className="container">
            <form onSubmit={validateUser}>

                <br /><img src='src/components/logo.png' height={150}/>

                <h1 id="txtBienvenida">RESTAURANTE CALI ES CALI</h1>

            <div className="containerform">
                <h3 id="txtBienvenida">Inicio de sesión</h3>
                <input type="text" className="entry" id="usuario" onChange={(e)=> setUsername(e.target.value)} placeholder="Usuario" required/><br /><br />
                <input type="password" className="entry" id="pass" onChange={(e)=> setPassword(e.target.value)} placeholder="Contraseña" required/><br />
                <input type="submit" value="Ingresar" id="btnEnviar"/>
            </div>
            
            </form>
        </div>
    )
}

export default Form;