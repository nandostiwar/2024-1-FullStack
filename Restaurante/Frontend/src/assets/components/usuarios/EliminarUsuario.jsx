import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './EliminarUsuario.css';

const EliminarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(''); // Cambiado el nombre a selectedUserId

  useEffect(() => {
    // Aquí realizar la llamada para obtener la lista de usuarios desde el backend
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
    if (!selectedUserId) { // Cambiado a selectedUserId
      alert('Por favor selecciona un usuario');
      return;
    }

  
    try {
      const response = await fetch(`https://restauranteback.vercel.app/restaurante/usuarios/${selectedUserId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }
      // Eliminar el usuario del estado local después de la eliminación
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== selectedUserId)); // Cambiado a _id
      setSelectedUserId('');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUserSelect = (e) => {
    setSelectedUserId(e.target.value); // Cambiado a selectedUserId
  };

  return (
    <div className="FormContainer">
      <div className="BackButtonContainer">
        <Link to="/admin" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
        </Link>
      </div>
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="FormLabel">
            Usuario:
            <select className="FormSelect" value={selectedUserId} onChange={handleUserSelect}> {/* Cambiado a selectedUserId */}
              <option value="">Seleccionar usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>{usuario.username}</option> 
              ))}
            </select>
          </label>
        </div>
        <button className="FormButton" type="submit">Eliminar Usuario</button>
      </form>
    </div>
  );
};

export default EliminarUsuario;
