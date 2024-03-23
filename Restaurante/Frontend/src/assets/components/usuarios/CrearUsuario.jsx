import React, { useState } from 'react';
import './CrearUsuario.css'

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rol, setRol] = useState('admin'); // Valor inicial

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí enviar los datos al backend y manejar la respuesta
    try {
      const response = await fetch('url_del_backend/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, rol }),
      });
      const data = await response.json();
      // Manejar la respuesta del backend
    } catch (error) {
      console.error('Error al crear usuario:', error);
      // Mostrar mensaje de error al usuario
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Apellido:
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </label>
        <label>
          Rol:
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="mesero">Mesero</option>
            <option value="cocina">Cocina</option>
          </select>
        </label>
        <button type="submit">Guardar Usuario</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
