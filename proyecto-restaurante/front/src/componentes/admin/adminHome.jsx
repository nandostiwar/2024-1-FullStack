// adminHome.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import axios from "axios";
import "../styles/adminHome.css"; // Importamos el archivo CSS

import Menu from "./menu";


const AdminHome = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://back-rho-seven.vercel.app/restaurante/productosOb");
      // console.log(response)
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async () => {
    try {
     const product = await axios.post("https://back-rho-seven.vercel.app/restaurante/productosAg", newProduct);
    //  console.log(product.data.productos);
     setProducts(product.data);
      setNewProduct({ name: "", price: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (product) => {
    console.log(product);
    setNewProduct({
      ...newProduct,
      _id: product._id,
      name: product.name,
      price: product.price
    });
  };

  const edit = async () => {
    console.log(newProduct);
    console.log(products)
    try {
      // newProduct lo envie al backend 
       await axios.post(`https://back-rho-seven.vercel.app/restaurante/productosEdit`,newProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  const deleteProduct = async (_id) => {
    try {
      
      await axios.delete(`https://back-rho-seven.vercel.app/restaurante/productosEli/${_id}`,);
  
      // Una vez que la eliminación sea exitosa, actualiza la lista de productos
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };
  console.log(products)
  const handleSalir = () => {
    window.location.href = '/';
};

  return (
    <>
    <div className="fondo-agregar">
    <div className="admin-container">
      <h2>Agregar Productos</h2>
      <div className="add-product">
        <h3>Nuevo Producto</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="input-field"
        />
          <button onClick={addProduct} className="add-button">
            Guardar
          </button>

          <button  onClick={edit} className="add-button">
            Editar
          </button>
          <button className="btn-salir" onClick={handleSalir}>Salir</button>


      </div>
      <div className="product-list">
  <h3>Editar Productos</h3>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>opciones</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product,index) => (
        <tr key={index}>
          <td>{index}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td><p onClick={() => updateProduct(product)}><i className="fas fa-edit edit-icon"></i></p></td>
          <td><p onClick={() => deleteProduct(product._id)}><i className="fas fa-trash-alt delete-icon"></i></p></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
    </div>
    </>
  );
};

export default AdminHome;
