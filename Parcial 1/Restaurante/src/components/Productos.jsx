import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Productos.css";

function Productos() {
    const [items, setItems] = useState([]);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', description: '', status: 'Activa' });
    const [comidas, setComidas] = useState([]);
    const [bebidas, setBebidas] = useState([]);

    const startEdit = (comida) => {
        setItemToEdit(comida);
    };

    const navigate = useNavigate();

    function goAdmin() {
        navigate("/Admin");
    }
    function goUsuarios() {
        navigate("/Usuarios");
    }
    function goPedidos() {
        navigate("/ListaPedidos");
    }


    useEffect(() => {
        fetch(`http://localhost:4000/v1/restaurante/comidas`)
            .then(response => response.json())
            .then(data => setComidas(data)) // Asume que 'data' es un array de comidas
            .catch(error => console.error('Error:', error));

        fetch(`http://localhost:4000/v1/restaurante/bebidas`)
            .then(response => response.json())
            .then(data => setBebidas(data)) // Asume que 'data' es un array de comidas
            .catch(error => console.error('Error:', error));
    }, []);


    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/v1/restaurante/comidas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) {
                throw new Error('Algo salió mal al añadir la comida');
            }
            const addedItem = await response.json();
            setComidas([...comidas, addedItem]); // Asumiendo que la API devuelve el objeto de la comida añadida
            // Limpiar el formulario aquí
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/v1/restaurante/comidas/${itemToEdit.id}`, {
                method: 'PUT', // o 'PUT', dependiendo de cómo tu API gestione las actualizaciones
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemToEdit),
            });
            if (!response.ok) {
                throw new Error('Algo salió mal al editar la comida');
            }
            const updatedItem = await response.json();
            setComidas(comidas.map(item => item.id === updatedItem.id ? updatedItem : item));
            // Limpiar el formulario y resetear el estado de edición aquí
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggleEstado = async (id) => {
        const item = comidas.find(item => item.id === id);
        const updatedEstado = item.estado === 'Activo' ? 'Inactivo' : 'Activo';

        try {
            const response = await fetch(`http://localhost:4000/v1/restaurante/comidas/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: updatedEstado }),
            });
            if (!response.ok) {
                throw new Error('Algo salió mal al cambiar el estado');
            }
            const updatedItem = await response.json();
            setComidas(comidas.map(item => item.id === updatedItem.id ? updatedItem : item));
        } catch (error) {
            console.error('Error:', error);
        }
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        if (itemToEdit) {
            setItemToEdit({ ...itemToEdit, [name]: value });
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    return (
        <div>
            <div className="btnb">
                <button id="btnHome" onClick={goAdmin}>Home</button>
                <button id="btnUsuarios" onClick={goUsuarios}>Usuarios</button>
                <button id="btnPedido" onClick={goPedidos}>Pedidos</button>
            </div>
            <div className="container">
                <div className="form-container">
                    <form className="formu" onSubmit={itemToEdit ? handleEditSubmit : handleAddSubmit}>
                        <input
                            name="name"
                            value={itemToEdit ? itemToEdit.name : ''}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        <input
                            name="description"
                            value={itemToEdit ? itemToEdit.description : ''}
                            onChange={handleChange}
                            placeholder="Descripción"
                            required
                        />
                        <input
                            name="price"
                            value={itemToEdit ? itemToEdit.price : ''}
                            onChange={handleChange}
                            placeholder="Precio"
                            required
                        />
                        <input
                            name="imageUrl"
                            value={itemToEdit ? itemToEdit.imageUrl : ''}
                            onChange={handleChange}
                            placeholder="URL de la Imagen"
                            required
                        />
                        <button type="submit">{itemToEdit ? 'Guardar Cambios' : 'Añadir'}</button>
                    </form>
                </div>
                <div className="tables-container">
                    <div className="comidas-section">
                        <header className="table-header">Tabla de Comidas</header>
                        <div className="comidas-table table-scroll" title='comidas'>
                            <title>comidas</title>
                            <table>
                                <thead className="thead-fixed">
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comidas.map((comida) => (
                                        <tr key={comida.id}>
                                            <td>
                                                <img src={`/images/${comida.imageUrl}`} alt={comida.name} style={{ width: '100px' }} />
                                            </td>
                                            <td>{comida.name}</td>
                                            <td>{comida.description}</td>
                                            <td>{comida.price}</td>
                                            <td>{comida.estado}</td>
                                            <td>
                                                <button className="button-change-state" onClick={() => toggleEstado(comida.id)}>Cambiar Estado</button>
                                                <button className="button-edit" onClick={() => startEdit(comida)}>Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bebidas-section">
                        <header className="table-header">Tabla de Bebidas</header>
                        <div className="bebidas-table table-scroll" title='Bebidas'>
                            <table>
                                <thead className="thead-fixed">
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bebidas.map((comida) => (
                                        <tr key={comida.id}>
                                            <td>
                                                <img src={`/images/${comida.imageUrl}`} alt={comida.name} style={{ width: '100px' }} />
                                            </td>
                                            <td>{comida.name}</td>
                                            <td>{comida.description}</td>
                                            <td>{comida.price}</td>
                                            <td>{comida.estado}</td>
                                            <td>
                                                <button className="button-change-state" onClick={() => toggleEstado(comida.id)}>Cambiar Estado</button>
                                                <button className="button-edit" onClick={() => startEdit(comida)}>Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productos;
