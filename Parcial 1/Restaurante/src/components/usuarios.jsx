import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./usuarios.css";
import "./Meseros.css";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioActivo, setUsuarioActivo] = useState({
        id: '',
        Nombre: '',
        Apellidos: '',
        Rol: '',
        Usuario: '',
        Password: '',
        Estado: 'Activo', // Por defecto, el estado es 'Activo'
    });
    const [editando, setEditando] = useState(false);

    const navigate = useNavigate();

    function goAdmin() {
        navigate("/Admin");
    }
    function goProductos() {
        navigate("/Productos");
    }
    function goPedidos() {
        navigate("/ListaPedidos");
    }

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await fetch('http://localhost:4000/v1/restaurante/usuarios');
            const data = await respuesta.json();
            setUsuarios(data); // Asume que 'data' es un array de usuarios
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Llamar obtenerUsuarios al montar el componente
    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioActivo({ ...usuarioActivo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:4000/v1/restaurante/usuarios';
        const method = editando ? 'PUT' : 'POST'; // 'PUT' para actualizar, 'POST' para añadir
        const usuarioId = editando ? `/${usuarioActivo.id}` : ''; // Añade el ID del usuario en la URL si estás editando

        try {
            const response = await fetch(url + usuarioId, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioActivo),
            });

            if (!response.ok) {
                throw new Error('Error al procesar la solicitud');
            }

            // Si la operación fue exitosa, actualiza la lista de usuarios
            await obtenerUsuarios();

            // Resetea el estado del formulario y sale del modo de edición
            setUsuarioActivo({
                id: '',
                Nombre: '',
                Apellidos: '',
                Rol: '',
                Usuario: '',
                Password: '',
                Estado: 'Activo',
            });
            setEditando(false);

        } catch (error) {
            console.error("Error:", error);
        }
    };


    const seleccionarUsuario = (usuario) => {
        setUsuarioActivo(usuario);
        setEditando(true);
    };

    const cambiarEstado = async (id) => {
        const usuario = usuarios.find(u => u.id === id);
        const nuevoEstado = usuario.Estado === 'Activo' ? 'Inactivo' : 'Activo';

        try {
            const response = await fetch(`http://localhost:4000/v1/restaurante/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Estado: nuevoEstado }),
            });

            if (!response.ok) {
                throw new Error('Error al cambiar el estado del usuario');
            }

            // Recargar la lista de usuarios para reflejar el cambio
            await obtenerUsuarios();
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div>
            <div className="btnb">
                <button id="btnHome" onClick={goAdmin}>Home</button>
                <button id="btnUsuarios" onClick={goProductos}>Productos</button>
                <button id="btnPedido" onClick={goPedidos}>Pedidos</button>
            </div>
            <div className="admin-container">
                <div className="formulario-container">
                    <form onSubmit={handleSubmit}>
                        <input

                            name="Nombre"
                            value={usuarioActivo.Nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        <input

                            name="Apellidos"
                            value={usuarioActivo.Apellidos}
                            onChange={handleChange}
                            placeholder="Apellidos"
                            required
                        />
                        <select name="Rol" type="text" value={usuarioActivo.Rol} onChange={handleChange} required>
                            <option value="">Selecciona un rol</option>
                            <option value="Admin">Admin</option>
                            <option value="Mesero">Mesero</option>
                            <option value="Cocinero">Cocinero</option>
                        </select>
                        <input

                            name="Usuario"
                            value={usuarioActivo.Usuario}
                            onChange={handleChange}
                            placeholder="Usuario"
                            required
                        />
                        <input
                            type="password"
                            name="Password"
                            value={usuarioActivo.Password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">{editando ? 'Guardar Cambios' : 'Añadir Usuario'}</button>
                    </form>
                </div>
                <div className="tabla-container">
                    <header className="table-header">Tabla de usuarios</header>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Rol</th>
                                <th>Usuario</th>
                                {/* Agrega más encabezados según sea necesario */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.Nombre}</td>
                                    <td>{usuario.Apellidos}</td>
                                    <td>{usuario.Rol}</td>
                                    <td>{usuario.Usuario}</td>
                                    {/* Continúa con los demás datos del usuario */}
                                    <td>
                                        <button onClick={() => seleccionarUsuario(usuario)}>Editar</button>
                                        <button onClick={() => cambiarEstado(usuario.id)}>
                                            {usuario.Estado === 'Activo' ? 'Inactivar' : 'Activar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    );
}

export default Usuarios;
