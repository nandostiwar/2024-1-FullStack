// Mesero.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { v4 as id_unico } from 'uuid';
import './styles/Mesero.css';

function Mesero({user}) {
  
  // Estado para almacenar los pedidos realizados por el mesero
const [mesa, setMesa] = useState('');
const [producto, setProducto] = useState('');
const [cantidad, setCantidad] = useState('');
const [pedido, setPedido] = useState({});
const AgregarProducto = async (event) => {
  event.preventDefault();
  const nuevoproducto = {
    producto: producto.name,
    cantidad: cantidad,
    nota: "",
    total: producto.price * cantidad
  };
  const nuevoPedido ={
    id: id_unico(),
    mesero: user.user,
    mesa: mesa,
    estado: "Pendiente",
    productos: [nuevoproducto],
    totalventa: nuevoproducto.total

  }
  
  const response = await axios.post('http://localhost:4000/v1/restaurant/sales', nuevoPedido);

  setPedido(nuevoPedido)

  }
  const [products, setProducts] = useState([]);
//getproducto
  const getProducts = async () => {
    const response = await axios.get('http://localhost:4000/v1/restaurant/products');
    setProducts(response.data);

  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className='Mesero'>
      <div className='Contenedor'>
        <h2>Pedido</h2>
        <form onSubmit={AgregarProducto}>
          <div>
            <label htmlFor="mesa">Mesa:</label>
            <select id="mesa" name="mesa" onChange={(event)=> setMesa(event.target.value)}>
              <option value="">Seleccione una mesa</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              {/* Aquí podrías mapear las opciones de mesas */}
            </select>
          </div>
          <div>
            <label htmlFor="producto">Producto:</label>
            <select id="producto" name="producto" onChange={(event)=> setProducto(products.find(p => p.name === event.target.value))}>
              <option value="">Seleccione un producto</option>
              {products.map((product, index) => (
                <option key={index} value={product.name}>{product.name}</option>
              ))}
              {/* Aquí podrías mapear las opciones de productos */}
            </select>
          </div>
          <div>
            <label htmlFor="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" name="cantidad" onChange={(event)=> setCantidad(event.target.value)}/>
          </div>
          <button type="submit">Agregar Producto</button>
        </form>
      </div>
      <div className='Contenedor'>
        <h2>Pedido</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {pedido?.productos?.map((producto,index) => 
            <tr key={index}>
              <td>{producto.producto}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.total}</td>
            </tr>
          )}
            
            {/* Aquí podrías mapear los pedidos y mostrarlos en la tabla */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mesero;
