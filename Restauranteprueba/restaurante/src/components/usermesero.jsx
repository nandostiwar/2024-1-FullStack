import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import './styleshtml/usermesero.css'

function Usermesero({user}){
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const [mesa, setMesa] = useState('');
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [selectProductos, setListaProductos] = useState([]);
    const [todosProductos, setTodosProductos] = useState([]);
    const [listaPedidos, setListaPedidos] = useState([]);


    if(user!=="mesero" || !user){
        return <Navigate to="/"/>
    }

    useEffect(() => {
        fetch('http://localhost:5000/productos/listaProductos')
            .then(response => response.json())
            .then(data => {
                setListaProductos(data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de productos:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/productos/todosProductos')
            .then(response => response.json())
            .then(data => {
                setTodosProductos(data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de productos:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/pedidos/listaPedidos')
            .then(response => response.json())
            .then(data => {
                setListaPedidos(data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de pedidos:', error);
            });
    }, []);

    const goHome = () => {
        navigate("/");
    };

    const enviarPedido = () => {
        if (!mesa.trim() || !producto.trim() || !cantidad.trim()) {
            alert('Por favor, complete todos los campos para crear el pedido.');
            return;
        }    
    
        fetch('http://localhost:5000/pedidos/crearPedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, mesa, producto, cantidad })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Muestra el mensaje del servidor en la consola
            alert('Pedido creado con éxito');
            setMesa('');
            setProducto('');
            setCantidad('');
    
            // Actualizar la lista de pedidos después de crear el pedido
            fetch('http://localhost:5000/pedidos/listaPedidos')
                .then(response => response.json())
                .then(data => {
                    setListaPedidos(data);
                })
                .catch(error => {
                    console.error('Error al obtener la lista de pedidos:', error);
                });
        })
        .catch(error => {
            console.error('Error al guardar el Pedido:', error);
        });
    }
    
    const calcularTotal = (pedido) => {
        const precioProducto = todosProductos.find(producto => producto.nombre === pedido.producto)?.precio;
        const cantidadPedido = parseInt(pedido.cantidad);
    
        if (!isNaN(precioProducto) && !isNaN(cantidadPedido)) {
            return precioProducto * cantidadPedido;
        }
        return 0;
    };
    
    return(
        <div className="container">
            <button onClick={goHome}>Salir</button>
            <h1>Mesero</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1,  marginRight: 30 }}>
                    <label htmlFor="mesa">Mesa</label>
                    <select value={mesa} onChange={(e) => setMesa(e.target.value)} id="mesa" name="role">
                        <option value="" disabled>Seleccione una mesa</option>
                        <option value="mesa1">mesa 1</option>
                        <option value="mesa2">mesa 2</option>
                        <option value="mesa3">mesa 3</option>
                    </select>
                </div>
                <div style={{ flex: 1, marginLeft: 30 }}>
                    <label htmlFor="producto">Producto</label>
                    <select value={producto} onChange={(e) => setProducto(e.target.value)} id="producto" name="role">
                        <option value="" disabled>Seleccione un producto</option>
                        {selectProductos.map((prod, index) => (
                            <option key={index} value={prod}>{prod}</option>
                        ))}
                    </select>
                </div>
                <div style={{ flex: 2, marginLeft: 60 }}>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input value={cantidad} onChange={(e) => setCantidad(e.target.value)} id="cantidad" type="number" placeholder=""></input>
                </div>
            </div>
            <button onClick={enviarPedido}>Guardar Pedido</button>

            <table>
                <thead>
                    <tr>
                        <th>Mesa</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidos.map((pedido, index) => (
                        <tr key={index}>
                            <td>{pedido.mesa}</td>
                            <td>{pedido.producto}</td>
                            <td>{pedido.cantidad}</td>
                            <td>{calcularTotal(pedido)}</td>
                            <td>{pedido.estado === 0 ? (
                                "Sin Confirmar"
                            ) : (
                                "Confirmado"
                            )}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Usermesero;