import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './styleshtml/usercocina.css'

function Usercocina({user}){
    const navigate = useNavigate();
    const [listaPedidos, setListaPedidos] = useState([]);

    if(user!=="cocina" || !user){
        return <Navigate to="/"/>
    }

    function goHome(){
        navigate("/");
    }

    useEffect(() => {
        fetch('http://localhost:5000/pedidos/listaPedidos')
            .then(response => response.json())
            .then(data => {
                setListaPedidos(data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de pedidos:', error);
            });
    }, []);

    const confirmarPedido = (index) => {
        // Mostrar alerta de confirmación
        const confirmacion = window.confirm('¿Estás seguro de confirmar este pedido?');
        if (!confirmacion) {
            return; // Si el usuario cancela la confirmación, no hacer nada
        }
    
        // Realizar la solicitud para actualizar el estado del pedido con el índice dado
        fetch(`http://localhost:5000/pedidos/confirmarPedido/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: 1 })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Muestra el mensaje del servidor en la consola
            // Actualizar la lista de pedidos después de confirmar el pedido
            fetch('http://localhost:5000/pedidos/listaPedidos')
                .then(response => response.json())
                .then(data => {
                    setListaPedidos(data);
                })
                .catch(error => {
                    console.error('Error al obtener la lista de pedidos:', error);
                });
        })
        .catch(error => {
            console.error('Error al confirmar el Pedido:', error);
        });
    };    

    return(
    <div className="container">
        <h1>Cocina</h1>

        <table>
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Mesa</th>
                    <th>Producto</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {listaPedidos.map((pedido, index) => (
                    <tr key={index}>
                        <td>{pedido.username}</td>
                        <td>{pedido.mesa}</td>
                        <td>{pedido.producto}</td>
                        <td>
                            {pedido.estado === 0 ? (
                                <button onClick={() => confirmarPedido(index)}>Confirmar</button>
                            ) : (
                                "Confirmado"
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goHome}>Salir</button>
    </div>
        
    )

}
export default Usercocina;