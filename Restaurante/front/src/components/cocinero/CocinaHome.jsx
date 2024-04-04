import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './styles/CocinaHome.css'

function CocinaHome() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [mesero, setMesero] = useState('');
    const [estado, setEstado] = useState('');
    const [productos, setProductos] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        async function getPedidos() {
            try {
                const response = await axios.get("http://localhost:4000/v1/signos/verpedidos");
                const pedidosArray = Object.values(response.data);
                setPedidos(pedidosArray);
            } catch (error) {
                console.error("Error al obtener pedidos:", error);
            }
        }
        getPedidos();
    }, []);

    async function handleRegister(e) {
        e.preventDefault();

        // Validate input fields
        if (id.trim() === '' || mesero.trim() === '' || estado.trim() === '' || productos.length === 0) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            await axios.post("http://localhost:4000/v1/signos/pedidos", {
                id, mesero, estado, productos
            });

            // Update the list of pedidos
            const response = await axios.get("http://localhost:4000/v1/signos/verpedidos");
            const pedidosArray = Object.values(response.data);
            setPedidos(pedidosArray);

            // Reset input fields
            setId('');
            setMesero('');
            setEstado('');
            setProductos([]);

        } catch (error) {
            console.error("Error al registrar el pedido:", error);
        }
    }

    function goHome() {
        navigate("/");
    }

    return (
        <form>
            <h1 id="txtBienvenida">Actualizar Pedidos</h1>
            <div className="txt">
                <label htmlFor="username">Id:</label>
                <input type="text" id="username" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="txt">
                <label htmlFor="username">Estado:</label>
                <input type="text" id="username" value={estado} onChange={(e) => setEstado(e.target.value)} />
            </div>
            <button id="btnRegistrar" onClick={handleRegister}>Actualizar</button>
            <button id="btnCerrarSesion" onClick={goHome}>Cerrar Sesion</button>
            <h1 id="txtBienvenida">Lista de Pedidos:</h1>
            <div id="listaPedidos">
                {/* Mostrar lista de pedidos */}
                <table className='table table-hover'>
                    <tbody>
                        {pedidos.map((val, key) => (
                            <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.mesero}</td>
                                <td>{val.estado}</td>
                                <td key={key}>
                                    {val.productos && val.productos.map((val, key) => (
                                        <div>
                                            <tr key={key}>
                                                <td>{val.nombre}</td>
                                                <td>{val.cantidad}</td>
                                                <td>{val.total}</td>
                                                <td>{val.nota}</td>
                                            </tr>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </form>
    );
}

export default CocinaHome;
