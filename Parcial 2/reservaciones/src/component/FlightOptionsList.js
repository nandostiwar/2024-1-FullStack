import React, { useState, useEffect } from 'react';
import './FlightOptionsList.css';

function FlightOptionsList() {
  const [reservaciones, setReservaciones] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);

  useEffect(() => {
      fetch('http://localhost:9000/v1/reservation/reservas')
          .then(response => response.json())
          .then(data => setReservaciones(data))
          .catch(error => console.error('Error al obtener reservaciones:', error));
  }, []);

  const handleSelectReserva = (reserva) => {
      setSelectedReserva(reserva);
  };

  return (
      <div>
          <h2>Reservaciones Actuales</h2>
          {reservaciones?.map((reserva, index) => (
              <div key={index} onClick={() => handleSelectReserva(reserva)} className={selectedReserva === reserva ? "reserva selected" : "reserva"}>
                <div>{reserva? "" : "No hay reservaciones!!!"}</div>
                  <p>- Origen: {reserva.origen.pais} === Destino: {reserva.destino.pais}</p>
                  <p>- Fecha: {new Date(reserva.fecha).toLocaleDateString()}</p>
                  <p>- Precio: {reserva.precio}€</p>
              </div>
              
          ))}
      </div>
  );
}

export default FlightOptionsList;


  