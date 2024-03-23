import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShop, AiOutlineDollar, AiOutlineSetting } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'; // Importa los iconos de flecha
import './Admin.css';

const Sidebar = () => {
  const [usuariosDesplegado, setUsuariosDesplegado] = useState(false);
  const [productosDesplegado, setProductosDesplegado] = useState(false);
  const [preciosDesplegado, setPreciosDesplegado] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`sidebar-container ${sidebarVisible ? 'visible' : 'hidden'}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarVisible ? <BsArrowLeft /> : <BsArrowRight />} {/* Muestra una flecha hacia la izquierda si el sidebar es visible, y hacia la derecha si no lo es */}
      </div>
      <div className="sidebar-group">
        <div className="sidebar-group-title" onClick={() => setUsuariosDesplegado(!usuariosDesplegado)}>Usuarios</div>
        {usuariosDesplegado && (
          <>
            <NavLink to="/admin/crear-usuario" className="sidebar-option">
              <AiOutlineUser size={20} style={{ marginRight: '10px' }} />
              Crear Usuario
            </NavLink>
            <NavLink to="/admin/editar-usuario" className="sidebar-option">
              <AiOutlineUser size={20} style={{ marginRight: '10px' }} />
              Editar Usuario
            </NavLink>
            <NavLink to="/admin/eliminar-usuario" className="sidebar-option">
              <AiOutlineUser size={20} style={{ marginRight: '10px' }} />
              Eliminar Usuario
            </NavLink>
          </>
        )}
      </div>
      <div className="sidebar-group">
        <div className="sidebar-group-title" onClick={() => setProductosDesplegado(!productosDesplegado)}>Productos</div>
        {productosDesplegado && (
          <>
            <NavLink to="/admin/crear-producto" className="sidebar-option">
              <AiOutlineShop size={20} style={{ marginRight: '10px' }} />
              Crear Producto
            </NavLink>
            <NavLink to="/admin/editar-producto" className="sidebar-option">
              <AiOutlineShop size={20} style={{ marginRight: '10px' }} />
              Editar Producto
            </NavLink>
            <NavLink to="/admin/eliminar-producto" className="sidebar-option">
              <AiOutlineShop size={20} style={{ marginRight: '10px' }} />
              Eliminar Producto
            </NavLink>
          </>
        )}
      </div>
      <div className="sidebar-group">
        <div className="sidebar-group-title" onClick={() => setPreciosDesplegado(!preciosDesplegado)}>Precios</div>
        {preciosDesplegado && (
          <>
            <NavLink to="/admin/crear-precio" className="sidebar-option">
              <AiOutlineDollar size={20} style={{ marginRight: '10px' }} />
              Crear Precio
            </NavLink>
            <NavLink to="/admin/editar-precio" className="sidebar-option">
              <AiOutlineDollar size={20} style={{ marginRight: '10px' }} />
              Editar Precio
            </NavLink>
            <NavLink to="/admin/eliminar-precio" className="sidebar-option">
              <AiOutlineDollar size={20} style={{ marginRight: '10px' }} />
              Eliminar Precio
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
