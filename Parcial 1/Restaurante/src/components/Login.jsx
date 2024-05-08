import React, { useState } from 'react';
import './Login.css';
import { Navigate, useNavigate,Routes, Route } from "react-router-dom";



function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/v1/restaurante/Login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": username, "password": password })
        })
            .then(response => response.json()) // Convertir la respuesta a JSON
            .then(data => goTo(`/${data.Rol}`)) // Manejar la respuesta de la petición
            .catch(error => console.error('Error:', error)); // Manejar un posible error
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

