// Mesero.jsx
import React, { useState } from "react";
import './styles/Mesero.css';

function Mesero() {
  // Estado para almacenar los pedidos realizados por el mesero
  const [pedidos, setPedidos] = useState([]);

  // Estado para almacenar los detalles del nuevo pedido
  const [nuevoPedido, setNuevoPedido] = useState({
    mesa: "",
    producto: "",
    cantidad: 0
  });

  // Función para manejar el cambio en los detalles del nuevo pedido
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoPedido(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar el envío del nuevo pedido
  const handleSubmit = (event) => {
    event.preventDefault();
    // Agregar el nuevo pedido a la lista de pedidos
    setPedidos(prevPedidos => [...prevPedidos, nuevoPedido]);
    // Restablecer el estado del nuevo pedido
    setNuevoPedido({
      mesa: "",
      producto: "",
      cantidad: 0
    });
  };

  return (
    <div className='Mesero'>
      <div className='Contenedor'>
        <h2>Pedido</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mesa">Mesa:</label>
            <select id="mesa" name="mesa" value={nuevoPedido.mesa} onChange={handleChange}>
              <option value="">Seleccione una mesa</option>
              {/* Aquí podrías mapear las opciones de mesas */}
            </select>
          </div>
          <div>
            <label htmlFor="producto">Producto:</label>
            <select id="producto" name="producto" value={nuevoPedido.producto} onChange={handleChange}>
              <option value="">Seleccione un producto</option>
              {/* Aquí podrías mapear las opciones de productos */}
            </select>
          </div>
          <div>
            <label htmlFor="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" name="cantidad" value={nuevoPedido.cantidad} onChange={handleChange} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div className='Contenedor'>
        <h2>Pedidos Realizados</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí podrías mapear los pedidos y mostrarlos en la tabla */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mesero;
