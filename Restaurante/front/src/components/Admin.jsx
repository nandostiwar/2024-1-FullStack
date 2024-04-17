// Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/styles/Admin.css';


function Admin() {
  // Estado para productos
  const [producto, setProducto] = useState('');
  const [precio, setPrecio] = useState('');
  // Estado para usuarios
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');

  // Estado para ventas (pedidos)
  const [ventas, setVentas] = useState([]);

//productos
//postproducto
  const agregarProducto =  async (e) => {
    e.preventDefault();
  const response = await axios.post('http://localhost:4000/v1/restaurant/product', {
      id: "1",
      name: producto,
      price: precio,
      activate:"true"
  });
  setProducts([...products,response.data])
  setProducto('')
  setPrecio('')

  };
  const [products, setProducts] = useState([]);
//getproducto
  const getProducts = async () => {
    const response = await axios.get('http://localhost:4000/v1/restaurant/products');
    setProducts(response.data);

  }
  //put producto
  const editarProducto = async () => {
    const response = await axios.put('http://localhost:4000/v1/restaurant/product', {
      name: producto,
      price: precio
  });
  console.log(response)
  }
  //deleteproducto
  const eliminarProducto = async (productname) =>{
    const response = await axios.delete(`http://localhost:4000/v1/restaurant/product?name=${productname}`);
    const modificarListaProductos = products.filter((item)=> item.name !== productname );
    setProducts(modificarListaProductos);
  }
  const [esEditar, setEsEditar] = useState(false);
  const verEditarProducto = (producto)  =>{
    setEsEditar(true);
    setProducto(producto.name);
    setPrecio(producto.price);
  }
//Usuarios
//postusuario
  const agregarUsuario = async (e) => {
    e.preventDefault();
  const response = await axios.post('http://localhost:4000/v1/restaurant/user', {
      
     id: "1",
     user: usuario,
     password: contraseña,
     role: rol,
     activate: "true"
  });
  setUsers([...users,response.data])
  setUsuario('')
  setContraseña('')
  setRol(' ')
  }; 
  const [users, setUsers] = useState([]);
  //getusuario
  const getUsuario = async () => {
    const response = await axios.get('http://localhost:4000/v1/restaurant/users');
    setUsers(response.data);

  }
  //putusuario
  const editarUsuario = async () => {
    const response = await axios.put('http://localhost:4000/v1/restaurant/user', {
      user: usuario,
      password: contraseña,
      role: rol
  });
  console.log(response)
  }
  //delete usuario
  const eliminarUsuario = async (usuariouser) =>{
    const response = await axios.delete(`http://localhost:4000/v1/restaurant/user`);
    const modificarListaUsuarios = users.filter((item)=> item.name !== usuariouser );
    setUsuario(modificarListaUsuarios);
  }
  const [Editar, setEditar] = useState(false);
  const verEditarUsuario= (usuario)  =>{
    setEditar(true);
    setUsuario(usuario.user);
    setContraseña(usuario.password);
    setRol(usuario.role);
  }

  useEffect(() => {
    getProducts();
    getUsuario();
  }, []);


  return (
    
    <div className='container'>
      <div className='d-flex'>
        <div className='col Container Producto'>
        <h2>Productos</h2>
        <form onSubmit={esEditar ? editarProducto : agregarProducto}>
          <div className='d-flex gap-2'>
            <div className='col'><input className='form-control' type="text" placeholder="Producto" value={producto} onChange={(e) => setProducto(e.target.value)} /></div>
            <div className='col'><input type="text" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} /></div>
            <div className='col'><button type="submit"> {esEditar ? 'Editar Producto' : 'Agregar Producto'}</button></div>
          </div>
        </form>
        <table className ="table">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            { products.map((producto,index)=>(
            <tr key={index}>
              <th scope="row">{producto.name}</th>
              <td>{producto.price}</td>
              <td>
                <div className='d-flex gap-2'>
                  <div className='col'><button type="button" className="btn btn-dark" onClick={() => verEditarProducto(producto)}>Editar</button></div>
                  <div className='col'><button type="button" className="btn btn-danger" onClick={() => eliminarProducto(producto.name)}>Eliminar</button></div>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
        <div className='col Container Usuario'>
          <h2>Usuarios</h2>
        <form onSubmit={Editar ? editarUsuario : agregarUsuario}>
          <div className='d-flex gap-2'>
            <div className='col'> <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} /></div>
            <div className='col'> <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} /></div>
            <div className='col'>
            <select value={rol} onChange={(e) => setRol(e.target.value)}>
               <option value="">Seleccione un rol</option>
               <option value="admin">Admin</option>
               <option value="mesero">Mesero</option>
               <option value="cocina">Cocinero</option>
            </select>
            </div>
            <div className='col'><button type="submit"> {Editar ? 'Editar' : 'Agregar'}</button></div>
          </div>
        </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Contraseña</th>
                <th scope="col">Rol</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
            { users.map((usuario,index)=>(
              <tr key={index}>
                <th scope="row">{usuario.user}</th>
                <td>{usuario.password}</td>
                <td>{usuario.role}</td>
                <td>
                  <div className='d-flex gap-2'>
                    <div className='col'><button type="button" className="btn btn-dark" onClick={() => verEditarUsuario(usuario)}>Editar</button></div>
                    <div className='col'><button type="button" className="btn btn-danger" onClick={() => eliminarUsuario(usuario)}>Eliminar</button></div>

                  </div>
                </td>
              </tr>
              ))}
            </tbody>
            </table>
      </div>
      </div>
      <div className='Container Ventas'>
        <h2>Ventas</h2>
        <table>
          <thead>
            <tr>
              <th>Mesero</th>
              <th>Producto</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta, index) => (
              <tr key={index}>
                <td>{venta.mesero}</td>
                <td>{venta.producto}</td>
                <td>{venta.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;