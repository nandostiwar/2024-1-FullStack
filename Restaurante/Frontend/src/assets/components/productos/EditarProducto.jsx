// EditarProducto.jsx

import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 
import './EditarProducto.css';

const EditarProducto = () => {
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
      const response = await fetch(`https://restauranteback.vercel.app/restaurante/productos`);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []); 

  const handleChangeProducto = (e) => {
    const { value } = e.target;
    console.log('Producto seleccionado:', value);
    setProductoSeleccionado(value);
    
    // Obtener los datos del producto seleccionado
    const productoSeleccionadoData = productos.find(prod => prod.id === value);
    console.log('Datos del producto seleccionado:', productoSeleccionadoData);
    if (productoSeleccionadoData) {
      setProducto(productoSeleccionadoData);
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Producto seleccionado:', productoSeleccionado);
    const idParseado = parseInt(productoSeleccionado);
    console.log('ID parseado:', idParseado);
    
    if (!isNaN(idParseado) && productoSeleccionado !== '') {
      const pedidoEditar = {
        nuevoNombre: producto.nombre, 
        nuevoPrecio: producto.precio,
        id: idParseado
      };
  
      try {
        const response = await fetch(`https://restauranteback.vercel.app/restaurante/productos/${idParseado}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pedidoEditar),
        });
  
        if (response.ok) {
          alert('Producto editado exitosamente');
        } else {
          throw new Error('Error al editar producto');
        }
      } catch (error) {
        console.error('Error al editar producto:', error);
        alert('Error al editar producto. Por favor, inténtalo de nuevo.');
      }
    } else {
      alert('Seleccione un producto válido');
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
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button className="GuardarProductoButton" type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default EditarProducto;
