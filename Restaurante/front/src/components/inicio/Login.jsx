import './styles/Login.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const goTo = useNavigate();

    useEffect(() => {
        // Realizar la solicitud GET para obtener los usuarios
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:4000/v1/signos/verusuarios");
                console.log(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        }
        fetchUsers();
    }, []);

    const validateUser = async (event) => {
        event.preventDefault();
        try {
            // Realizar la solicitud POST para validar el usuario
            const response = await axios.post("http://localhost:4000/v1/signos/usuarios", {
                username,
                password,
                rol: rol // Asegúrate de enviar el rol adecuado
            });
    
            const foundUser = response.data;
    
            if (foundUser) {
                callback(foundUser.rol);
                switch (foundUser.rol) {
                    case 'mesero':
                        goTo("/meseroHome");
                        break;
                    case 'cocinero':
                        goTo("/cocinaHome");
                        break;
                    case 'admin':
                        goTo("/adminHome");
                        break;
                    default:
                        // Manejar caso no especificado
                        break;
                }
            } else {
                console.error("Credenciales incorrectas");
                // Manejar credenciales incorrectas (por ejemplo, mostrar un mensaje al usuario)
            }
        } catch (error) {
            console.error("Error al validar el usuario:", error);
            // Manejar errores (por ejemplo, mostrar un mensaje al usuario)
        }
    }

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a Nuestro Restaurante</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br></br>
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br></br>
            <div className="txt">
                <label htmlFor="rol">Rol: </label>
                <div>
                <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="">Seleccionar Rol</option>
                    <option value="mesero">Mesero</option>
                    <option value="cocinero">Cocinero</option>
                    <option value="admin">Admin</option>
                </select>
                </div>
            </div>
            <input type="submit" value="Ingresar" id="btnEnviar" />
        </form>
    )
}

export default Login;
