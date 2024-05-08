import React from 'react';
import './FlightOption.css';

function FlightOption({ flight, reservaciones }) {
  return (
      <div className="flight-option">
          <h4>{flight.name} - ${flight.price}</h4>
          {reservaciones && reservaciones.length > 0 && (
              <div>
                  <h5>Reservaciones:</h5>
                  {reservaciones.map((reserva, index) => (
                      <p key={index}>
                          Reservado para: {new Date(reserva.fecha).toLocaleDateString()} - Precio: ${reserva.precio}
                      </p>
                  ))}
              </div>
          )}
      </div>
  );
}

export default FlightOption;


