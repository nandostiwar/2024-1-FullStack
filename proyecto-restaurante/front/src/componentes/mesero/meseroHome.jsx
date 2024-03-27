import React, { useState, useEffect } from 'react';
import '../styles/meseroHome.css';
import axios from "axios";

const MeseroHome = () => {
    const [mesa, setMesa] = useState('');
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]); // Nuevo estado para almacenar los productos

    useEffect(() => {
        fetchProducts();
      }, []);
    
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/restaurante/productosOb");
           console.log(response)
           setProductos(response.data.productos);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

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
                    {/* Mostrar lista de productos en un select */}
                    <select value={producto} onChange={(event) => handleChange(event, setProducto)}>
                        <option value="">Seleccione un producto</option>
                        {productos.map(product => (
                            
                        
                            <option key={product.id} value={product.name}>{product.name}</option>
                            
                        ))}
                    </select>
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


