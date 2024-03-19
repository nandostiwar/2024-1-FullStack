import React, { useState } from 'react';
import '../styles/meseroHome.css';

const MeseroHome = () => {
    const [mesa, setMesa] = useState('');
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pedidos, setPedidos] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validación básica del formulario
        if (!mesa.trim() || !producto.trim() || cantidad <= 0) {
            alert("Por favor, llene todos los campos correctamente");
            return;
        }

        // Crear un nuevo pedido con los datos actuales
        const nuevoPedido = { mesa, producto, cantidad, estado: 'pendiente' };
        
        // Agregar el nuevo pedido a la lista de pedidos
        setPedidos([...pedidos, nuevoPedido]);
        
        // Limpiar los campos después de enviar el pedido
        setMesa('');
        setProducto('');
        setCantidad('');
    };

    const handleChange = (event, setter) => {
        setter(event.target.value);
    };

    return (
        <div> 
            <form onSubmit={handleSubmit} className="form-container">
            <h1>Meseros</h1>    
                <label>
                    Mesa:
                    <input type="text" value={mesa} onChange={(event) => handleChange(event, setMesa)} />
                </label>
                <label>
                    Producto:
                    <input type="text" value={producto} onChange={(event) => handleChange(event, setProducto)} />
                </label>
                <label>
                    Cantidad:
                    <input type="number" value={cantidad} onChange={(event) => handleChange(event, setCantidad)} />
                </label>
                <button type="submit">Enviar</button>
            </form>
            <div className="pedidos-container">
                <h2>Pedidos:</h2>
                <ul>
                    {pedidos.map((pedido, index) => (
                        <li key={index} className="pedido-item">
                            <div>Mesa: {pedido.mesa}</div>
                            <div>Producto: {pedido.producto}</div>
                            <div>Cantidad: {pedido.cantidad}</div>
                            <div className="estado-pendiente">Estado: {pedido.estado}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MeseroHome;

