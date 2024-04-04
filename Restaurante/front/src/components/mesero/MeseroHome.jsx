import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './styles/MeseroHome.css'

function MeseroHome() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [mesero, setMesero] = useState('');
    const [estado, setEstado] = useState('');
    const [productos, setProductos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [usuariosList, setUsuarios] = useState([]);

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

    useEffect(() => {
        async function getProductos() {
            try {
                const response = await axios.get("http://localhost:4000/v1/signos/consulproduc");
                const productosArray = Object.values(response.data);
                setProductos(productosArray);
            } catch (error) {
                console.error("Error al obtener pedidos:", error);
            }
        }
        getProductos();
    }, []);

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
        if (id.trim() === '' || mesero.trim() === '' || estado.trim() === '' || selectedProducts.length === 0) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            await axios.post("http://localhost:4000/v1/signos/pedidos", {
                id, mesero, estado, productos: selectedProducts
            });

            // Update the list of pedidos
            const response = await axios.get("http://localhost:4000/v1/signos/verpedidos");
            const pedidosArray = Object.values(response.data);
            setPedidos(pedidosArray);

            // Reset input fields
            setId('');
            setMesero('');
            setEstado('');
            setSelectedProduct([]);

        } catch (error) {
            console.error("Error al registrar el pedido:", error);
        }
    }

    function goHome() {
        navigate("/");
    }

    return (
        <form>
            <h1 id="txtBienvenida">Registrar Pedidos</h1>
            <div className="txt">
                <label htmlFor="username">Id:</label>
                <input type="text" id="username" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="txt">
                <label htmlFor="username">Mesero:</label>
                <select value={mesero} onChange={(e) => setMesero(e.target.value)}>
                    <option value="">Selecciona un mesero</option>
                    {usuariosList.map(user => (
                        user.rol === 'mesero' && (
                            <option key={user.username} value={user.username}>{user.username}</option>
                        )
                    ))}
                </select>
            </div>
            <div className="txt">
                <label htmlFor="username">Estado:</label>
                <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="tomado">Tomado</option>
                    <option value="preparando">Preparando</option>
                    <option value="listo">Listo</option>
                </select>
            </div>
            <div className="txt">
                <label htmlFor="username">Producto:</label>
                <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
                    <option value={null}>Selecciona un producto</option>
                    {productos.map(producto => (
                        <option key={producto.nombreproduc} value={producto}>
                            {producto.nombreproduc}
                        </option>
                    ))}
                </select>
                {selectedProduct && (
                    <input
                        type="number"
                        value={selectedProduct.cantidad}
                        onChange={e => setSelectedProduct({ ...selectedProduct, cantidad: e.target.value })}
                    />
                )}
                <button onClick={() => setSelectedProducts([...selectedProducts, selectedProduct])}>Agregar Producto</button>
            </div>
            <button id="btnRegistrar" onClick={handleRegister}>Registrar Pedido</button>
            <button id="btnCerrarSesion" onClick={goHome}>Cerrar Sesion</button>
            <h2 id="txtBienvenida">Lista de Pedidos:</h2>
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

export default MeseroHome;