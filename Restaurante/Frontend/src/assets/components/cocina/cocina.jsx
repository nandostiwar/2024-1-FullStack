import React, { useState, useEffect } from 'react';
import './cocina.css';

const PerfilCocina = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:4000/restaurante/pedidos');
        if (!response.ok) {
          throw new Error('Error al cargar los pedidos: ' + response.statusText);
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };
  
    fetchPedidos();
  }, []);

  const handleChangeEstado = async (pedidoId, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:4000/restaurante/pedidos/${pedidoId}`, {
        method: 'PACTCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }), 
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el estado del pedido: ' + response.statusText);
      }
  
      console.log('Estado del pedido actualizado correctamente');
      
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
    }
  };

  return (
    <div className="CocinaContainer">
      <h2>Perfil de Cocina</h2>
      <div className="PedidosContainer">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="PedidoItem">
            <div>
              <span>Mesa: {pedido.mesa}</span>
              <span>Estado: {pedido.estado}</span>
            </div>
            <div>
              <ul>
                {pedido.productos.map((producto, index) => (
                  <li key={index}>{producto.nombre} - Cantidad: {producto.cantidad}</li>
                ))}
              </ul>
            </div>
            <div>
              {pedido.estado === 'procesando' && (
                <button onClick={() => handleChangeEstado(pedido.id, 'listo')}>Marcar como Listo</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilCocina;
