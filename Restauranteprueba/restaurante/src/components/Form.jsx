import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './styleshtml/Form.css'
import userData from './../../../api-json/bd';

function Form({callback}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = (event) => {
        event.preventDefault();
        
        // Busca el usuario en el archivo JSON
        const user = userData.find(u => u.username === username && u.password === password);

        if (user) {
            callback(user.role);
            goTo(`/user${user.role}`);
            localStorage.setItem('username', username); // GUARDAR PARAMETRO CONSULTA O PETICION
        } else {
            console.log("Usuario o contraseña incorrectos");
            alert('Usuario o contraseña incorrectos');  
        }
    }

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Restaurante Maria del Mar</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="botonenviar" /> 
        </form>
    )
}

export default Form;
