import React, { useState } from 'react';
import './Login.css';



function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí podrías agregar la lógica para verificar las credenciales
        // Por ejemplo, podrías hacer una solicitud a una API
        console.log('Intentando iniciar sesión con', username, password);
        // Asegúrate de manejar correctamente la autenticación y la seguridad
    };

    return (
        <div className="login-form">
            <h2>Delicias de Mina</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
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

}

export default Login