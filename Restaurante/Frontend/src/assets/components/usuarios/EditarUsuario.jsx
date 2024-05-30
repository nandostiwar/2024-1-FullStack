import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './EditarUsuario.css';

const EditarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRol, setNewRol] = useState('administrador');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('https://restauranteback.vercel.app/restaurante/usuarios');
        const data = await response.json();
        setUsuarios(data);
        
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert('Por favor selecciona un usuario');
      return;
    }


    try {
      const response = await fetch(`https://restauranteback.vercel.app/restaurante/usuarios/${selectedUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername, newPassword, newRol }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }
      const data = await response.json();
      console.log('Usuario actualizado:', data);

      setSelectedUser('');
      setNewUsername('');
      setNewPassword('');
      setNewRol('administrador');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="FormContainer">
      <div className="BackButtonContainer">
        <Link to="/admin" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
        </Link>
      </div>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="FormLabel">
            Usuario:
            <select className="FormSelect" value={selectedUser} onChange={handleUserSelect}>
              <option value="">Seleccionar usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>{usuario.username}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Nuevo nombre:
            <input className="FormInput" type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Nueva contraseña:
            <input className="FormInput" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Nuevo rol:
            <select className="FormSelect" value={newRol} onChange={(e) => setNewRol(e.target.value)}>
              <option value="administrador">administrador</option>
              <option value="mesero">Mesero</option>
              <option value="cocina">Cocina</option>
            </select>
          </label>
        </div>
        <button className="FormButton GuardarUsuarioButton" type="submit">Guardar Usuario</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
