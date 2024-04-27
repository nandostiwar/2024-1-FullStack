import './styles/Form.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Importa useNavigate desde 'react-router-dom'

    const validateUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.patch('http://localhost:4000/v1/restaurant/login', {
                username: username,
                password: password
            });
            callback(response.data);

            // Extrae el rol del usuario de la respuesta del servidor
            const role = response.data.role;
        

            // Redirige al usuario según su rol
            switch (role) {
                case 'admin':
                    navigate('/Admin');
                    break;
                case 'mesero':
                    navigate('/Mesero');
                    break;
                case 'cocina':
                    navigate('/Cocina');
                    break;
                default:
                    console.error('Rol de usuario no válido:', role);
                    break;
            }
        } catch (error) {
            console.error('Error:', error);
            // Resto del código para manejar el error
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={validateUser}>
                <h1 id="txtBienvenida">Bienvenido Salsabor</h1>
                <h4 className="txt">Nombre de Usuario</h4>
                <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                <h4 className="txt">Contraseña</h4>
                <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <input type="submit" value="Ingresar" id="btnEnviar" />
            </form>
        </div>
    );
}

export default Form;
