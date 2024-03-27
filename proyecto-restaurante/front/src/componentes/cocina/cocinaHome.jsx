import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/cocinaHome.css';

const Cocina = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/restaurante/pedidos");
            setPedidos(response.data.pedidos);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
        }
    };

    const marcarPedidoListo = async (id) => {
        try {
            // Envía una solicitud al backend para marcar el pedido como listo
            await axios.put(`http://localhost:3000/restaurante/pedidos/${id}`, { estado: 'listo' });
            // Actualiza la lista de pedidos para reflejar el cambio
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
        } catch (error) {
            console.error("Error marking pedido as listo:", error);
        }
    };

    return (
        <div>
            <h1>Cocina</h1>
            <table>
                <thead>
                    <tr>
                        <th>Mesa</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.mesa}</td>
                            <td>{pedido.producto}</td>
                            <td>{pedido.cantidad}</td>
                            <td>{pedido.estado}</td>
                            <td>
                                {pedido.estado === 'pendiente' && (
                                    <button onClick={() => marcarPedidoListo(pedido.id)}>Marcar como listo</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Cocina;
