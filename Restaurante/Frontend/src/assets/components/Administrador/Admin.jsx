import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShop, AiOutlineDollar } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import './Admin.css';

const Sidebar = () => {
  const [usuariosDesplegado, setUsuariosDesplegado] = useState(false);
  const [productosDesplegado, setProductosDesplegado] = useState(false);
  const [ventasDesplegado, setVentasDesplegado] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [expanded, setExpanded] = useState(true); // Agrega un estado para controlar si el sidebar está expandido o no
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setExpanded(!expanded); // Cambia el estado de expandido cuando se toglea el sidebar
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src="./src/1109982_Salt_Seasoning_Unknown_1920x1080.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={`sidebar-container ${sidebarVisible ? 'visible' : 'hidden'} ${expanded ? '' : 'collapsed'}`}>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarVisible ? <BsArrowLeft /> : <BsArrowRight />}
        </div>
        <div className={`sidebar-group ${expanded ? 'expanded' : ''}`}>
          <div className="sidebar-group-title" onClick={() => setUsuariosDesplegado(!usuariosDesplegado)}><AiOutlineUser size={20} /></div>
          {expanded && usuariosDesplegado && (
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
        <div className={`sidebar-group ${expanded ? 'expanded' : ''}`}>
          <div className="sidebar-group-title" onClick={() => setProductosDesplegado(!productosDesplegado)}><AiOutlineShop size={20} /></div>
          {expanded && productosDesplegado && (
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
        <div className={`sidebar-group ${expanded ? 'expanded' : ''}`}>
          <div className="sidebar-group-title" onClick={() => setVentasDesplegado(!ventasDesplegado)}><AiOutlineDollar size={20} /></div>
          {expanded && ventasDesplegado && (
            <>
              <NavLink to="/admin/total-ventas" className="sidebar-option">
                <AiOutlineDollar size={20} style={{ marginRight: '10px' }} />
                Total de Ventas
              </NavLink>
            </>
          )}
        </div>
        {sidebarVisible && (
          <button className={`Btn ${expanded ? 'visible' : 'hidden'}`} onClick={handleLogout}>
            <div className="sign">
              <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
            </div>
            <div className="text">Cerrar Sesión</div>
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
