import React, { useState, useEffect } from "react";
import "../styles/Tiquete.css";

//esta se utilizan para declarar el estado
const Tiquete = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    if (origin) {
      fetch(`https://tiquetes-1-back.vercel.app/reserva/pais`)
        .then((response) => response.json()) // Realiza una solicitud HTTP GET a la URL proporcionada
        .then((data) => setOriginSuggestions(data))// sedan las respuesta en formato JSON
        //se actualizan los estados y se muestra un mensaje de error si esta repetido
        .catch((error) =>
          console.error("Error fetching origin suggestions:", error)
        );
    }
  }, [origin]);

  useEffect(() => {
    if (destination) {
      fetch(`https://tiquetes-1-back.vercel.app/reserva/pais`)
        .then((response) => response.json())
        .then((data) => setDestinationSuggestions(data))
        .catch((error) =>
          console.error("Error fetching destination suggestions:", error)
        );
    }
  }, [destination]);

  const handleOriginSelection = (selectedName) => { //representa el nombre del origen seleccionado por el usuario
    setOrigin(selectedName);
    setOriginSuggestions([]);
  };

  const handleDestinationSelection = (selectedName) => {
    setDestination(selectedName);
    setDestinationSuggestions([]);
  };

  const handleSubmit = (event) => { // envio de formulario
    event.preventDefault();

    if (origin === destination) {
      alert("El origen y el destino se deben cambiar");
      return;
    }

    const ticket = {
      origin,
      destination,
      date,
    };
    

    fetch("https://tiquetes-1-back.vercel.app/reserva/tiquetes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el tiquete");
        }
        return response.json();
      })
      .then((data) => {
        setGeneratedTickets([...generatedTickets, data]);
        setOrigin("");
        setDestination("");
        setDate("");
        
      })
      .catch((error) => {
        console.error("Error al guardar el tiquete:", error);
      });
  };

  return (
    <div className="ticket-form">
      <h1>Tiquetes de avión</h1>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-inline">
          <div className="form-field">
          </div>
          <div className="form-field">
            <input
              type="text"
              id="origin"
              placeholder="Origen"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
            />
            <ul>
              {originSuggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleOriginSelection(suggestion.name)} 
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-field">
            <input
              type="text"
              id="destination"
              placeholder="Destino"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
            <ul>
              {destinationSuggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleDestinationSelection(suggestion.name)} 
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-field">
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        </div>
        <div className="contenedor-boton">
          <button type="submit" className="generate-ticket-button">
            Guardar
          </button>
        </div>
      </form>

      {generatedTickets.map((ticket, index) => (
        <div key={index} className="generated-ticket-container">
          <h2>Lista de vuelo</h2>
          <p>Origen: {ticket.origin}</p>
          <p>Destino: {ticket.destination}</p>
          <p>Fecha: {ticket.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Tiquete;
