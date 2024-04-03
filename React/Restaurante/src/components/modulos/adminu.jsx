import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function AdminU() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: '', user: '', password: '', role: '', activate: '' });
  const [editUser, setEditUser] = useState({ id: '', user: '', password: '', role: '', activate: '' });

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/v1/sitio/all');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditUserChange = (event) => {
    const { name, value } = event.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:4000/v1/sitio/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        getAllUsers();
        setNewUser({ id: '', user: '', password: '', role: '', activate: '' });
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/v1/sitio/${editUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUser),
      });
      if (response.ok) {
        getAllUsers();
        setEditUser({ id: '', user: '', password: '', role: '', activate: '' });
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Administrar Usuarios</h1>
      <h2>Agregar Usuario</h2>
      <input type="text" name="id" placeholder="ID" value={newUser.id} onChange={handleNewUserChange} />
      <input type="text" name="user" placeholder="Nombre" value={newUser.user} onChange={handleNewUserChange} />
      <input type="text" name="password" placeholder="Contraseña" value={newUser.password} onChange={handleNewUserChange} />
      <input type="text" name="role" placeholder="Rol" value={newUser.role} onChange={handleNewUserChange} />
      <input type="text" name="activate" placeholder="Estado" value={newUser.activate} onChange={handleNewUserChange} />
      <button onClick={handleCreateUser}>Agregar</button>

      <h2>Editar Usuario</h2>
      <input type="text" name="id" placeholder="ID" value={editUser.id} onChange={handleEditUserChange} />
      <input type="text" name="user" placeholder="Nombre" value={editUser.user} onChange={handleEditUserChange} />
      <input type="text" name="password" placeholder="Contraseña" value={editUser.password} onChange={handleEditUserChange} />
      <input type="text" name="role" placeholder="Rol" value={editUser.role} onChange={handleEditUserChange} />
      <input type="text" name="activate" placeholder="Estado" value={editUser.activate} onChange={handleEditUserChange} />
      <button onClick={handleUpdateUser}>Actualizar</button>

      <h2>Usuarios</h2>
      <table className='table table-hover'>
        <thead className='table table-primary'>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.password}</td>
              <td>{item.role}</td>
              <td>{item.activate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminU;
