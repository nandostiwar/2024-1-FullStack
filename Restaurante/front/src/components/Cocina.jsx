import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/styles/Cocina.css';

function Cocina() {
  // Estado para almacenar los pedidos por mesa
  const [pedidos, setPedidos] = useState([]);
  async function getPedidos() {
    const response = await axios.get('http://localhost:4000/v1/restaurant/sales');
    setPedidos(response.data);
  }

  // Función para cambiar el estado de un pedido
  const cambiarEstadoPedido  = async (pedido) => {
    pedido.estado = "Listo";
    const response = await axios.put('http://localhost:4000/v1/restaurant/sale', pedido);
    const listaPedidosModificar = pedidos.map(pedido => pedido.id === response.data.id ? response.data : pedido);
    setPedidos(listaPedidosModificar);
  };
  useEffect(() => {
    getPedidos();
  })

  return (
    <div className="Cocina Contenedor">
      <h2>Cocina</h2>
      <table className="table-light">
        <thead>
          <tr>
            <th>Mesa</th>
            <th>Pedido</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.filter(pedido => pedido.estado === "Pendiente").map((pedido, index) => (
            <tr key={index}>
              <td className="light">{pedido.mesa}</td>
              <td className="light">
                <ul>
                  {pedido.productos.map((producto,index) => (
                    <li key={index}>
                      {producto.producto}
                      -
                      {producto.cantidad}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="light">
                <button className="light" onClick={() => cambiarEstadoPedido(pedido)}>
                  {pedido.estado === 'Pendiente' ? 'Listo' : 'Pendiente'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cocina;
