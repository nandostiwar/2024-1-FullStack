import  { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

const TicketForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [savedTickets, setSavedTickets] = useState([]);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    if (origin) {
      fetch(`http://localhost:3000/api/vuelos/paises?query=${origin}`)
        .then(response => response.json())
        .then(data => {
          console.log(data); 
          setOriginSuggestions(data);
        })
        .catch(error => console.error('Error fetching origin suggestions:', error));
    }
  }, [origin]);

  useEffect(() => {
    if (destination) {
      fetch(`http://localhost:3000/api/vuelos/paises?query=${destination}`)
        .then(response => response.json())
        .then(data => {
          console.log(data); 
          setDestinationSuggestions(data);
        })
        .catch(error => console.error('Error fetching destination suggestions:', error));
    }
  }, [destination]);

const handleSaveTicket = async () => {
  if (origin && destination && date) {
    try {
      
      const fechaActual = new Date();

      const response = await fetch('http://localhost:3000/api/vuelos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ origin, destination, date: fechaActual }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el tiquete');
      }

      const newTicket = await response.json();
      setSavedTickets([...savedTickets, newTicket]);
      
      
      alert('El boleto se ha creado con éxito');

    } catch (error) {
      console.error('Error al guardar el tiquete:', error);
      alert('Error al guardar el tiquete');
    }
  } else {
    alert('Por favor completa todos los campos');
  }
};

  

  const handleOriginChange = (e) => {
    const value = e.target.value;
    setOrigin(value);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
  };

  return (
    <div className="container ticket-form-background">
      <h1>Registro de Vuelos</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>País de Origen:</label>
            <input
              type="text"
              value={origin}
              onChange={handleOriginChange}
              className="form-control"
              list="originSuggestions"
            />
            <datalist id="originSuggestions">
              {originSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion.name} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>País de Destino:</label>
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              className="form-control"
              list="destinationSuggestions"
            />
            <datalist id="destinationSuggestions">
              {destinationSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion.name} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Fecha:</label>
            <DatePicker
              selected={date}
              onChange={date => setDate(date)}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleSaveTicket}>Guardar</button>
      <hr />
      <h2>Tickets Guardados</h2>
      <ul className="list-group">
        {savedTickets.map((ticket, index) => (
          <li key={index} className="list-group-item">
            <strong>Origen:</strong> {ticket.origin}, <strong>Destino:</strong> {ticket.destination}, <strong>Fecha:</strong> {ticket.date.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketForm;
