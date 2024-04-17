import React, { useState } from 'react';
import '../components/styles/Cocina.css';

function Cocina() {
  // Estado para almacenar los pedidos por mesa
  const [pedidos, setPedidos] = useState([
    { mesa: 1, pedido: 'Hamburguesa con papas fritas', estado: 'Pendiente' },
    { mesa: 2, pedido: 'Pizza', estado: 'Listo' },
    { mesa: 3, pedido: 'Ensalada', estado: 'Pendiente' },
  ]);

  // Función para cambiar el estado de un pedido
  const cambiarEstadoPedido = (index) => {
    const nuevosPedidos = [...pedidos];
    nuevosPedidos[index].estado =
      nuevosPedidos[index].estado === 'Pendiente' ? 'Listo' : 'Pendiente';
    setPedidos(nuevosPedidos);
  };

  return (
    <div className="Cocina">
      <h2>Cocina</h2>
      <table>
        <thead>
          <tr>
            <th>Mesa</th>
            <th>Pedido</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={index}>
              <td>{pedido.mesa}</td>
              <td>{pedido.pedido}</td>
              <td>
                {pedido.estado}
                <button onClick={() => cambiarEstadoPedido(index)}>
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
