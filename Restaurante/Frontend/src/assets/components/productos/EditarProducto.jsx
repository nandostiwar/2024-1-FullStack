import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Importa el icono de flecha izquierda
import './EditarProducto.css';

const EditarProducto = () => {
  const { id } = useParams(); // Obtener el ID del producto a editar de los parámetros de la URL

  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: ''
  });

  // Función para cargar los datos del producto desde el backend
  const cargarProductos = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurante/productos`);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const handleChangeProducto = (e) => {
    const { value } = e.target;
    setProductoSeleccionado(value);

    // Obtener los datos del producto seleccionado
    const productoSeleccionadoData = productos.find(prod => prod.id === value);
    setProducto(productoSeleccionadoData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/restaurante/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      const data = await response.json();
      // Manejar la respuesta del backend
    } catch (error) {
      console.error('Error al editar producto:', error);
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
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="FormLabel">
            Producto:
            <select className="FormInput" value={productoSeleccionado} onChange={handleChangeProducto}>
              <option value="">Seleccionar Producto</option>
              {productos.map(prod => (
                <option key={prod.id} value={prod.id}>{prod.nombre}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Nombre:
            <input className="FormInput" type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Precio:
            <input className="FormInput" type="text" name="precio" value={producto.precio} onChange={handleChange} />
          </label>
        </div>
        <button className="FormButton" type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
