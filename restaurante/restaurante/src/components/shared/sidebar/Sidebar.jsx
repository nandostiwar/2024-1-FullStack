import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <NavLink to="/cocina" activeClassName="active"><i className="icon-sidebar fas fa-user-edit"></i>Crear usuario</NavLink>
            <NavLink to="/platos" activeClassName="active"><i className="icon-sidebar fas fa-hamburger"></i>Platos</NavLink>
            <NavLink to="/ventas" ><i className="icon-sidebar fas fa-coins"></i>Ventas</NavLink>
        </div>
    );
}

export default Sidebar;
