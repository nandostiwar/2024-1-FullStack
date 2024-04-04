import { useNavigate } from 'react-router-dom';
import './styles/RegistroHome.css';
import { useState, useEffect } from 'react';
import axios from "axios";
    
function RegistroHome() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const [usuariosList, setUsuarios] = useState([]);

    useEffect(() => {
        async function getUsuarios() {
            try {
                const response = await axios.get("http://localhost:4000/v1/signos/verusuarios");
                const usuariosArray = Object.values(response.data);
                setUsuarios(usuariosArray);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        }
        getUsuarios();
    }, []);

    async function handleRegister(e) {
        e.preventDefault();

        // Validate input fields
        if (username.trim() === '' || password.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/v1/signos/usuario", {
                username, password, rol
            });
            console.log(response.data);

            // Update the list of users
            async function updateUsuarios() {
                const response = await axios.get("http://localhost:4000/v1/signos/verusuarios");
                const usuariosArray = Object.values(response.data);
                setUsuarios(usuariosArray);
            }
            updateUsuarios();

            // Reset input fields
            setUsername('');
            setPassword('');

        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
        }
    }

    function goPanel() {
        navigate("/adminHome");
    }

    return (
        <form>
            <h1 id="txtBienvenida">Registro de Usuario</h1>
            <div className="txt">
                <label htmlFor="username">Nombre de Usuario:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="txt">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
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
            <button id="btnGuardar" onClick={handleRegister}>Registrar Usuario</button>
            <button id="btnIrLogin" onClick={goPanel}>Volver al Panel</button>
            <h2 id="txtBienvenida">Lista de Usuarios:</h2>
            <div id="listaUsuarios">
            <table className='table table-primary'>
                    <tbody>
                        {usuariosList.map((val, key) => (
                            <tr key={key}>
                                <td>{val.username}</td>
                                <td>{val.password}</td>
                                <td>{val.rol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
}

export default RegistroHome;