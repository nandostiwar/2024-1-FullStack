import './styleshtml/Useradmin.css'
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Useradmin({user}){
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');

    const [username, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRol] = useState('');
    const [todosProductos, setTodosProductos] = useState([]);
    const [listaPedidos, setListaPedidos] = useState([]);

    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    
    const goHome = () => {
        navigate("/");
    };

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

    const enviarProdutco = () => {
        if (!nombre.trim() || !precio.trim()) {
            alert('Por favor, complete todos los campos del producto.');
            return;
        }

        fetch('http://localhost:5000/productos/crearProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, precio })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Muestra el mensaje del servidor en la consola
            alert('Producto creado con éxito');
            setNombre('');
            setPrecio('');
        })
        .catch(error => {
            console.error('Error al guardar el producto:', error);
        });
    };

    const enviarUsuario = () => {
        if (!username.trim() || !password.trim() || !role.trim()) {
            alert('Por favor, complete todos los campos para crear usuario.');
            return;
        }

        fetch('http://localhost:5000/usuarios/crearUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Muestra el mensaje del servidor en la consola
            alert('Usuario creado con éxito');
            setUsuario('');
            setPassword('');
            setRol('');
        })
        .catch(error => {
            console.error('Error al guardar el Usuario:', error);
        });
    };

    const calcularTotal = (pedido) => {
        const precioProducto = todosProductos.find(producto => producto.nombre === pedido.producto)?.precio;
        const cantidadPedido = parseInt(pedido.cantidad);
    
        if (!isNaN(precioProducto) && !isNaN(cantidadPedido)) {
            return precioProducto * cantidadPedido;
        }
        return 0;
    };

    return (
        <div className="container">
            <button onClick={goHome}>Salir</button>
            <h1>Administrador</h1>
            <h5>Restaurante Maria Del Mar</h5>

            <h2>Producto</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <label htmlFor="name_product">Nombre</label>
                    <input id='name_product' type="text" placeholder="Nombre del Producto" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
                </div>
                <div style={{ flex: 1, marginLeft: 45}}>
                    <label htmlFor="precio_product">Precio</label>
                    <input id='precio_product' type="text" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)}></input>
                </div>
            </div>
            <button onClick={enviarProdutco}>Guardar Producto</button>

            <h2>Usuario</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1,  marginRight: 30 }}>
                    <label htmlFor="usuario">Usuario</label>
                    <input id='usuario' type="text" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUsuario(e.target.value)}/>
                </div>
                <div style={{ flex: 1, marginLeft: 30 }}>
                    <label htmlFor="contra">Contraseña</label>
                    <input id='contra' type="password" placeholder="Contraseña Segura" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div style={{ flex: 2, marginLeft: 60 }}>
                    <label htmlFor="select_rol">Role</label>
                    <select value={role} onChange={(e) => setRol(e.target.value)} id='select_rol' name="role">
                        <option value="" disabled>Seleccione un rol</option>
                        <option value="admin">administrador</option>
                        <option value="mesero">mesero</option>
                        <option value="cocina">cocina</option>
                    </select>
                </div>
            </div>
            <button onClick={enviarUsuario}>Guardar Usuario</button>

            <h1>Lista de Ventas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Mesero</th>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidos
                        .filter(pedido => pedido.estado === 1) // Filtrar solo los pedidos con estado 1
                        .map((pedido, index) => (
                            <tr key={index}>
                                <td>{pedido.username}</td>
                                <td>{pedido.producto}</td>
                                <td>{calcularTotal(pedido)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Useradmin;