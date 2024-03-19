import { useState } from "react";
import Sidebar from "../../shared/sidebar/Sidebar";

function CrearUsuario() {
  const [userData, setUserData] = useState({
    rol: "cocinero",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo usuario:", userData);
    // Para enviar al back
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="user-module">
        <h2>Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rol">Rol:</label>
            <select id="rol" name="rol" value={userData.rol} onChange={handleChange}>
              <option value="cocinero">Cocinero</option>
              <option value="mesero">Mesero</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    </>
  );
}

export default CrearUsuario;
