import React, { useState, useEffect } from 'react';
import './ListaPedidos.css';

function ListaPedidos() {
    const [pedidosEnPreparacion, setPedidosEnPreparacion] = useState([]);
    const [pedidosListos, setPedidosListos] = useState([]);

    const obtenerPedidos = async () => {
        try {
            const respuesta = await fetch('http://localhost:4000/v1/restaurante/pedidos');
            const response = await respuesta.json();
            const enPreparacion = response.filter(pedido => pedido.estado === "En preparación");
            const listos = response.filter(pedido => pedido.estado === "Listo");
            console.log("estos son los listos:", listos);
            setPedidosEnPreparacion(enPreparacion);
            setPedidosListos(listos);
        } catch (error) {
            console.error("Error al obtener los pedidos:", error);
        }
    };

    useEffect(() => {
        obtenerPedidos();
    }, []);

    const cambiarEstadoPedido = async (idPedido, nuevoEstado) => {
        try {
            await fetch(`http://localhost:4000/v1/restaurante/pedidos/${idPedido}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            });

            // Actualiza ambos estados para reflejar el cambio en la UI
            obtenerPedidos(); // Ahora debería ser accesible
        } catch (error) {
            console.error("Error al cambiar el estado del pedido:", error);
        }
    };


    return (
        <div className="lista-pedidos">
            <h2>Pedidos</h2>
            <div className="columnas-pedidos">
                <div className="pedidos-en-preparacion">
                    <h3>En Preparación</h3>
                    {pedidosEnPreparacion.map(pedido => (
                        <div key={pedido.idPedido} className="pedido-card">
                            <h3>Mesa: {pedido.idMesa}</h3>
                            {pedido.items.map((item, index) => (
                                <div key={index} className="pedido-item">
                                    <p><strong>Item:</strong> {item.tipo} #{item.idItem}</p>
                                    <p><strong>Cantidad:</strong> {item.cantidad}</p>
                                    {item.comentario && <p><strong>Comentario:</strong> {item.comentario}</p>}
                                </div>
                            ))}
                            <button onClick={() => cambiarEstadoPedido(pedido.idPedido, 'Listo')}>
                                Marcar como Listo
                            </button>
                        </div>
                    ))}
                </div>
                <div className="pedidos-listos">
                    <h3>Listos para Servir</h3>
                    {pedidosListos.map(pedido => (
                        <div key={pedido.idPedido} className="pedido-card">
                            <h3>Mesa: {pedido.idMesa}</h3>
                            {pedido.items.map((item, index) => (
                                <div key={index} className="pedido-item">
                                    <p><strong>Item:</strong> {item.tipo} #{item.idItem}</p>
                                    <p><strong>Cantidad:</strong> {item.cantidad}</p>
                                    {item.comentario && <p><strong>Comentario:</strong> {item.comentario}</p>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default ListaPedidos;
