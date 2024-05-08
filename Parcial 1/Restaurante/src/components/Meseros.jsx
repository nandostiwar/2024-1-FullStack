import "./Meseros.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import TableSelector from './Selectormesas';

function Meseros({ user }) {

    const [comidas, setComidas] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [mensaje, setMensaje] = useState({ visible: false, texto: "" });
    const [resetCard, setResetCard] = useState({ flag: false, hideComment: true });


    const [pedido, setPedido] = useState({
        idMesa: null,
        items: [],
        fecha: new Date().toISOString().slice(0, 10),
        estado: "En preparación",
        total: 0
    });

    const navigate = useNavigate();


    useEffect(() => {
        // Petición para obtener las comidas
        fetch(`http://localhost:4000/v1/restaurante/comidas`)
            .then(response => response.json())
            .then(data => setComidas(data)) // Actualizar el estado con los datos obtenidos
            .catch(error => console.error('Error:', error));

        // Asumiendo que tienes otra URL para bebidas, repite el proceso para obtener bebidas
        fetch(`http://localhost:4000/v1/restaurante/bebidas`)
            .then(response => response.json())
            .then(data => setBebidas(data)) // Actualizar el estado con los datos obtenidos
            .catch(error => console.error('Error:', error));
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez

    /*
    // Redireccionar si no es un mesero o si no hay usuario
    if (user !== "Mesero" || !user) {
        navigate("/");
        return null; // Opcional: retornar un componente de carga o null mientras redirige
    }*/

    function goHome() {
        navigate("/");
    }

    function gopedidos() {
        navigate("/Cosinero");
    }

    const agregarItemAlPedido = (item) => {
        setPedido(prevPedido => {
            const itemsActualizados = [...prevPedido.items, item];
            const totalActualizado = itemsActualizados.reduce((acc, curr) => acc + (curr.cantidad * curr.precioUnitario), 0);

            return {
                ...prevPedido,
                items: itemsActualizados,
                total: totalActualizado,
                idMesa: selectedTable, // Asegúrate de actualizar esto cuando seleccionas una mesa
            };
        });
        console.log(pedido);
    };

    const estadoInicialPedido = {
        idMesa: null, // Posiblemente quieras mantener la mesa seleccionada o resetearla también
        items: [],
        fecha: new Date().toISOString().slice(0, 10), // Esto generará la fecha actual cada vez que se reinicie
        estado: "En preparación",
        total: 0
    };

    // Para enviar el pedido
    const enviarPedido = () => {
        fetch('http://localhost:4000/v1/restaurante/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Pedido enviado:', data);
                setMensaje({ visible: true, texto: "Pedido enviado con éxito!" });

                // Reinicia el estado del pedido
                setPedido(estadoInicialPedido);

                // Opcional: esconde el mensaje después de 5 segundos
                setTimeout(() => {
                    setMensaje({ visible: false, texto: "" });
                }, 5000);

                setResetCard({ flag: !resetCard.flag, hideComment: true });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div className="btnb">
            <button id="btnHome" onClick={goHome}>Home</button>
            <button id="btnPedido" onClick={gopedidos}>Pedidos</button>
            </div>
            {mensaje.visible && <div className="mensaje">{mensaje.texto}</div>}
            <TableSelector onSelectTable={setSelectedTable} selectedTable={selectedTable} />
            <div className="btnv"> <button id="sendpedido" onClick={enviarPedido}>enviar pedido</button> </div>
            <h2>Comidas</h2>
            <div className="menu-grid">
                {comidas.map((item) => (
                    <MenuCard key={item.id} item={item} onAgregarItem={agregarItemAlPedido} tipo="Comida" reset={resetCard} />
                ))}
            </div>
            <h2>Bebidas</h2>
            <div className="menu-grid">
                {bebidas.map((item) => (
                    <MenuCard key={item.id} item={item} onAgregarItem={agregarItemAlPedido} tipo="Bebida" reset={resetCard} />
                ))}
            </div>
        </div>
    );
}

export default Meseros;


