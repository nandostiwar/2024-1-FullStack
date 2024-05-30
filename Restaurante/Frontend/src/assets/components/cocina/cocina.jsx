import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cocina.css';


const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);
  const goTo = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('https://restauranteback.vercel.app/restaurante/pedidos');
        if (!response.ok) {
          throw new Error('Error al cargar los pedidos: ' + response.statusText);
        }
        const data = await response.json();
        setPedidos(data.filter(pedido => pedido.estado === 'procesando'));
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const handleMarcarComoListo = async (id) => {
    console.log("ID del pedido:", id);
    try {
        // Realizar la petición PATCH para marcar el pedido como listo
        const response = await fetch(`https://restauranteback.vercel.app/restaurante/pedidos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: 'listo' }),
        });

        if (!response.ok) {
            throw new Error('Error al marcar el pedido como listo');
        }

        // Si la petición PATCH fue exitosa, procedemos a agregar la venta a la colección de ventas
        const pedidoListo = pedidos.find(pedido => pedido._id === id); // Asegúrate de que el ID sea accedido correctamente

        const ventaResponse = await fetch('https://restauranteback.vercel.app/restaurante/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mesero: pedidoListo.mesero,
                producto: pedidoListo.productos.map(producto => producto.nombre).join(', '), // Concatenar los nombres de los productos
                totalVentas: pedidoListo.total
            }),
        });

        if (!ventaResponse.ok) {
            throw new Error('Error al agregar la venta a la base de datos de ventas');
        }

        // Si la venta se agregó correctamente, actualizamos la lista de pedidos en la interfaz eliminando el pedido marcado como listo
        setPedidos(pedidos.filter(pedido => pedido._id !== id)); // Asegúrate de que el ID sea accedido correctamente
        
    } catch (error) {
        console.error('Error al marcar el pedido como listo:', error);
    }
};

  

  const handleLogout = () => {
    
    localStorage.removeItem('nameUser');
    
    goTo('/');
  };

  return (
    <div className="cocina-background">
    <div className="CocinaContainer">
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      <h2>Pedidos en Cocina</h2>
      <div className="PedidosContainer">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="PedidoItem">
            <h3>Mesa: {pedido.mesa}</h3>
            <p>Mesero: {pedido.mesero}</p>
            <ul>
              {pedido.productos.map((producto, index) => (
                <li key={index}>
                  {producto.cantidad}x {producto.nombre}
                </li>
              ))}
            </ul>
            <p>Total: ${pedido.total}</p>
            <button onClick={() => handleMarcarComoListo(pedido.id)}>Marcar como listo</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Cocina;
