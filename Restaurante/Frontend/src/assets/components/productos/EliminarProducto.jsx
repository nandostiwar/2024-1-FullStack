import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Importa el icono de flecha izquierda
import './EliminarProducto.css';

const EliminarProducto = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos
  const [selectedProductId, setSelectedProductId] = useState(''); // Estado para almacenar el ID del producto seleccionado

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

  // Cargar los productos al cargar el componente
  useEffect(() => {
    cargarProductos();
  }, []); 

  const handleEliminar = async () => {
    console.log(`Eliminando producto con ID: ${selectedProductId}`);
    try {
      const response = await fetch(`http://localhost:4000/restaurante/productos/${selectedProductId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
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
      <h2>Eliminar Producto</h2>
      <div className="SelectContainer">
        <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
          <option value="">Seleccione un producto</option>
          {productos.map((prod) => (
            <option key={prod._id} value={prod._id}>{prod.nombre}</option>
          ))}
        </select>
      </div>
      <div className="AccionesContainer">
        <button className="EliminarButton" onClick={handleEliminar} disabled={!selectedProductId}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default EliminarProducto;
