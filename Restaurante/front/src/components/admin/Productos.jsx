import { useNavigate } from 'react-router-dom';
import './styles/RegistroHome.css';
import { useState, useEffect } from 'react';
import axios from "axios";

function RegistroHome() {
    const navigate = useNavigate();
    const [nombreproduc, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [usuariosList, setUsuarios] = useState([]);

    useEffect(() => {
        async function getUsuarios() {
            try {
                const response = await axios.get("http://localhost:4000/v1/signos/consulproduc");
                const usuariosArray = Object.values(response.data);
                setUsuarios(usuariosArray);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        }
        getUsuarios();
    }, []);

    async function handleRegister(e) {
        e.preventDefault();

        // Validate input fields
        if (nombreproduc.trim() === '' || precio.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/v1/signos/crearproduc", {
                nombreproduc, precio
            });
            console.log(response.data);

            // Update the list of users
            async function updateUsuarios() {
                const response = await axios.get("http://localhost:4000/v1/signos/consulproduc");
                const usuariosArray = Object.values(response.data);
                setUsuarios(usuariosArray);
            }
            updateUsuarios();

            // Reset input fields
            setNombre('');
            setPrecio('');

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
            <h1 id="txtBienvenida">Registro de Productos</h1>
            <div className="txt">
                <label htmlFor="username">Nombre producto:</label>
                <input type="text" id="username" value={nombreproduc} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="txt">
                <label htmlFor="password">Precio:</label>
                <input type="password" id="password" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </div>
            <button id="btnGuardar" onClick={handleRegister}>Registrar Producto</button>
            <button id="btnIrLogin" onClick={goPanel}>Volver al Panel</button>
            <h2 id="txtBienvenida">Lista de Productos:</h2>
            <div id="listaUsuarios">
                <table className='table table-hover'>
                    <tbody>
                        {usuariosList.map((val, key) => (
                            <tr key={key}>
                                <td>{val.nombreproduc}</td>
                                <td>{val.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
}

export default RegistroHome;