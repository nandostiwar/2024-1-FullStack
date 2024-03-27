import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Importa el icono de flecha izquierda
import './EliminarProducto.css';

const EliminarProducto = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos
  const [selectedProduct, setSelectedProduct] = useState(''); // Estado para almacenar el producto seleccionado
  const [producto, setProducto] = useState(null); // Estado para almacenar los detalles del producto seleccionado
  const [accion, setAccion] = useState('eliminar');

  // Función para cargar los datos del producto desde el backend
  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:4000/restaurante/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  // Función para cargar los datos del producto seleccionado
  const cargarProducto = async (productId) => {
    try {
      
      const response = await fetch(`http://localhost:4000/restaurante/productos/${productId}`);
      const data = await response.json();
      console.log("Cargando producto con ID:", productId);
      setProducto(data);
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  };

  // Cargar los productos al cargar el componente
  useEffect(() => {
    console.log("Producto seleccionado:", selectedProduct);
    cargarProductos();
  }, []); 

  // Cargar el producto seleccionado cuando cambie
  useEffect(() => {
    console.log("Producto seleccionado:", selectedProduct);
    if (selectedProduct) {
      cargarProducto(selectedProduct);
    }
  }, [selectedProduct]);

  const handleEliminar = async () => {
    try {
      let url = `http://localhost:4000/restaurante/productos/${selectedProduct}`;
      if (accion === 'deshabilitar') {
        url += '/deshabilitar';
      }
      const response = await fetch(url, {
        method: 'DELETE',
      });
      const data = await response.json();
      // Manejar la respuesta del backend
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      // Mostrar mensaje de error al usuario
    }
  };

  return (
    <div className="ProductoContainer">
      <div className="BackButtonContainer">
        <Link to="/admin" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
        </Link>
      </div>
      <h2>{accion === 'eliminar' ? 'Eliminar Producto' : 'Deshabilitar Producto'}</h2>
      <div className="SelectContainer">
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Seleccione un producto</option>
          {productos.map((prod) => (
            <option key={prod.id} value={prod.id}>{prod.nombre}</option>
          ))}
        </select>
      </div>
      {producto && (
        <div className="ProductoInfo">
          <div className="ProductoDetails">
            <p>{producto.nombre}</p>
            <p><strong>ID:</strong> {producto.id}</p>
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Precio:</strong> {producto.precio}</p>
          </div>
        </div>
      )}
      <div className="AccionesContainer">
        <button className="EliminarButton" onClick={handleEliminar} disabled={!selectedProduct}>
          {accion === 'eliminar' ? 'Eliminar' : 'Deshabilitar'}
        </button>
        <button className="DeshabilitarButton" onClick={() => setAccion('deshabilitar')}>
          Deshabilitar
        </button>
      </div>
    </div>
  );
};

export default EliminarProducto;
