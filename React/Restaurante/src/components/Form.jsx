import './styles/Form.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Form({ callback }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);
  const goTo = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/v1/sitio/all')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const validateUser = (event) => {
    event.preventDefault();

    const user = userData.find((user) => user.user === username && user.password === password);
    
    if (user && user.activate === true) {
      callback(user.role); 
      if (user.role === 'cocina') {
        goTo('/homeCocina');
      } else if (user.role === 'admin') {
        goTo('/homeAdmin');
      } else if (user.role === 'mesero') {
        goTo('/homeMesero');
      }
    } else {
      alert('Credenciales incorrectas o Usuario inactivo');
    }
  };

  return (
    <form onSubmit={validateUser}>
      <h1 id="txtBienvenida">Bienvenido a nuestro Restaurante</h1>
      <h4 className="txt">Nombre de Usuario</h4>
      <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br></br>
      <h4 className="txt">Contraseña</h4>
      <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br></br>
      <input type="submit" value="Ingresar" id="btnEnviar" />
    </form>
  );
}

export default Form;





/* quemados
import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();
 
    const validateUser = (event)=>{
        event.preventDefault();
        if(username === 'cocina' && password === 'cocina2023'){
            callback("user");
            goTo("/homeCocina");
        }else if(username === 'admin' && password==='admin2023'){
            callback("admin");
            goTo("/homeAdmin");
        }
    }
    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro Restaurante</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
        </form>
    )
}

export default Form;
*/


/* con back 1
import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({callback}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();
 
    const validateUser = async (event)=>{
        event.preventDefault();

        try {
            // Hacer la solicitud para obtener la lista de usuarios
            const response = await fetch('./api-json/db/users');
            if (!response.ok) {
                throw new Error('Error al obtener la lista de usuarios');
            }
            const users = await response.json();

            // Verificar si el usuario existe en la lista
            const userExists = users.some(user => user.username === username && user.password === password);
            if (userExists) {
                // Usuario encontrado, redirigir al usuario a la página correspondiente
                callback(username); // Llama a la función de devolución de llamada con el nombre de usuario
                if (username === 'cocina') {
                    goTo("/homeCocina");
                } else if (username === 'admin') {
                    goTo("/homeAdmin");
                }
            } else {
                // Usuario no encontrado, muestra un mensaje de error
                alert('Nombre de usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al verificar el usuario');
        }
    }

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" value={username} onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" value={password} onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar"/>
        </form>
    )
}

export default Form;

*/