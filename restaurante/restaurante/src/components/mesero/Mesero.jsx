import { useState, useEffect } from "react";
import "./Mesero.css";
import Sidebar from "../shared/sidebar/Sidebar";
import axios from "axios";

function MeseroModule() {
  const [platos] = useState([
    { id: 1, nombre: "Hamburguesa", precio: 10 },
    { id: 2, nombre: "Pizza", precio: 12 },
    { id: 3, nombre: "Ensalada César", precio: 8 },
    { id: 4, nombre: "Sopa de Tomate", precio: 6 },
    { id: 5, nombre: "Consome", precio: 10 },
    { id: 6, nombre: "Pizza Jamon", precio: 12 },
    { id: 7, nombre: "Ensalada", precio: 8 },
    { id: 8, nombre: "Sopa", precio: 6 },
  ]);

  const [pedido, setPedido] = useState({});
  const [totalPedido, setTotalPedido] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.entries(pedido).forEach(([id, cantidad]) => {
      const plato = platos.find((p) => p.id === parseInt(id));
      total += plato.precio * cantidad;
    });
    setTotalPedido(total);
  }, [pedido, platos]);

  const agregarPlato = (plato) => {
    const nuevoPedido = { ...pedido };
    if (nuevoPedido[plato.id]) {
      nuevoPedido[plato.id] += 1;
    } else {
      nuevoPedido[plato.id] = 1;
    }
    setPedido(nuevoPedido);
  };

  const eliminarPlato = (id) => {
    const nuevoPedido = { ...pedido };
    if (nuevoPedido[id] > 1) {
      nuevoPedido[id] -= 1;
    } else {
      delete nuevoPedido[id];
    }
    setPedido(nuevoPedido);
  };

  const enviarPedido = () => {
    console.log(pedido);
    fetch("url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pedido }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar el pedido");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="mesero-module">
        <div className="platos-lista">
          {platos.map((plato) => (
            <div className="plato-card" key={plato.id}>
              <h3>{plato.nombre}</h3>
              <p>Precio: ${plato.precio}</p>
              <button onClick={() => agregarPlato(plato)}>Agregar al Pedido</button>
            </div>
          ))}
        </div>
        <div className="pedido-lista">
          <h2>Pedido del Cliente</h2>
          {Object.keys(pedido).length > 0 ? (
            <>
              <ul>
                {Object.entries(pedido).map(([id, cantidad]) => {
                  const plato = platos.find((p) => p.id === parseInt(id));
                  return (
                    <li key={id}>
                      {plato.nombre} - ${plato.precio} x {cantidad}
                      <a onClick={() => eliminarPlato(id)}>
                        <i className="icon-menos fas fa-minus-circle"></i>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="total-pedido">Total del Pedido: ${totalPedido}</p>
              <button onClick={enviarPedido}>Enviar Pedido</button>
            </>
          ) : (
            <div className="contenedor-sin-platos">
              <i className="icon-food fas fa-utensils fa-5x"></i>
              <p>No hay platos seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MeseroModule;
