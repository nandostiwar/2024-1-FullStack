import "../admin/Menu.css";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div className="fondo-menu">
        <div className="hoola">
          <div>
            <NavLink to="/adminHome" activeClassName="active">
              Admin
            </NavLink>
          </div>
          <div>
            <h1>hola</h1>
          </div>
          <div>
            <h1>hola</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
