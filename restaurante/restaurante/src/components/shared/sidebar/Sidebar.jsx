import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className={`sidebar ${sidebarVisible ? 'sidebar' : 'collapsed'}`}>
            <p className="toggle-btn" onClick={toggleSidebar}>
                <i className="fas fa-bars fa-lg"></i>
            </p>
            <NavLink to="/cocina" activeClassName="active"><i className="icon-sidebar fas fa-user-edit"></i>Crear usuario</NavLink>
            <NavLink to="/platos" activeClassName="active"><i className="icon-sidebar fas fa-hamburger"></i>Platos</NavLink>
            <NavLink to="/ventas"><i className="icon-sidebar fas fa-coins"></i>Ventas</NavLink>
            <NavLink to="/ventas"><i className="icon-sidebar fas fa-utensils"></i>Cocina</NavLink>
            <NavLink to="/mesero" activeClassName="active"><i className="icon-sidebar fas fa-clipboard-list"></i>Mesero</NavLink>
            <NavLink to="/login" className="cerrar-sesion"><i className="icon-sidebar fas fa-sign-out-alt"></i>Cerrar sesion</NavLink>
        </div>
    );
}

export default Sidebar;