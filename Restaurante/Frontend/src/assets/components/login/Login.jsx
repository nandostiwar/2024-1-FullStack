import './Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logueo = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const goTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/restaurante/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    
    try {
      const data = await response.json();
      localStorage.setItem('nameUser', data.usuario.username)
      console.log(data.usuario.username)
    
      if (response.ok) {
        setSuccessMessage('Iniciando sesión...');
        setTimeout(() => {
          setSuccessMessage('Inicio de sesión exitoso');
          const { usuario } = data;
          
          if (usuario.rol === 'mesero') {
            goTo('/perfil-mesero'); // Redirige al perfil del mesero
          } else if (usuario.rol === 'cocina') {
            goTo('/perfil-cocina'); // Redirige al perfil de cocina
          } else if (usuario.rol === 'administrador') {
            goTo('/admin'); // Redirige al perfil del administrador
          } else {
            setErrorMessage('No tienes permisos para acceder a esta página');
          }
        }, 1000); 
      } else {
        setErrorMessage(data.mensaje || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al procesar la respuesta del servidor:', error);
      setErrorMessage('Error interno del servidor');
    }
  };

  return (
    <div className="login-background">
    <div className="container">
    <div className="card">
    <a className="login">SABOREATÉ</a>
    <form className="login-form" onSubmit={handleLogin}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="inputBox">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <span className="user">Usuario</span>
      </div>
      <div className="inputBox">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span>Contraseña</span>
      </div>
      <button className="enter" type="submit">Iniciar sesión</button>
    </form>
  </div>
</div>
</div>

  );
};

export default Logueo;
