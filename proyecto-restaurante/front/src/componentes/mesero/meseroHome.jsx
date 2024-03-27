import React, { useState, useEffect } from 'react';
import '../styles/meseroHome.css';
import axios from "axios";

const MeseroHome = () => {
    const [mesa, setMesa] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]); // Nuevo estado para almacenar los productos

    useEffect(() => {
        fetchProducts();
      }, []);
    
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/restaurante/productosOb");
          console.log(response);
          setProductos(response.data.productos);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validación básica del formulario
        if (!mesa.trim() || !productoSeleccionado.trim() || cantidad <= 0) {
            alert("Por favor, llene todos los campos correctamente");
            return;
        }

        // Encontrar el producto seleccionado
        const selectedProduct = productos.find(producto => producto.name === productoSeleccionado);
        if (!selectedProduct) {
            alert("El producto seleccionado no está disponible.");
            return;
        }

        // Calcular el precio total del pedido
        const precioTotal = selectedProduct.price * cantidad;

        // Crear un nuevo pedido con los datos actuales
        const nuevoPedido = { mesa, producto: productoSeleccionado, cantidad, precioTotal, estado: 'pendiente' };
        
        // Agregar el nuevo pedido a la lista de pedidos
        setPedidos([...pedidos, nuevoPedido]);
        
        // Limpiar los campos después de enviar el pedido
        setMesa('');
        setProductoSeleccionado('');
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
                    <select value={productoSeleccionado} onChange={(event) => handleChange(event, setProductoSeleccionado)}>
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
                            <div>Precio Total: {pedido.precioTotal}</div>
                            <div className="estado-pendiente">Estado: {pedido.estado}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MeseroHome;



