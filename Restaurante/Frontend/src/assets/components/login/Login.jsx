import './Login.css'
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Logueo = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const goTo =useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      alert('Usuario Correcto');
      goTo('/admin');
      
    } else if (username === 'mesero' && password === '1234') {
      alert('Usuario Correcto');
      goTo('mesero');
    } else if (username === 'cocina' && password === '1234') {
      alert('Usuario Correcto');
      goTo('/cocina');
    } else {
      alert('usuario o contraseña incorrecta');
    }

    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login Saboreaté</h2>
        <div className="input-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Logueo;

