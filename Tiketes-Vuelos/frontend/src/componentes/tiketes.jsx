import '../styles/tiketes.css'

// App.js (Frontend)
import { useState, useEffect } from 'react';
import axios from 'axios';

const Tiketes = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [dia, setDia] = useState('');
  const [Viajes, setViajes] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/v3/tiket/Countries`);
        setViajes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlights();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/v3/tiket/Viajes', { origen, destino, dia });
      setOrigen('');
      setDestino('');
      setDia('');
      window.location.reload(); // Actualizar la lista de vuelos
    }catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='Tikete-contenido'>
      <br></br>
      <h1>Formulario de Tiquetes de Avión</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
        <input type="text" placeholder="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
        <input type="date" value={dia} onChange={(e) => setDia(e.target.value)} />
        <button type="submit" className="btn btn-primary">Guardar Vuelo</button>
      </form>
      <br></br>
      <h2>Vuelos Registrados</h2>
      <table className="table table-bordered table-striped mb-3">
        <thead >
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Día</th>
          </tr>
        </thead>
        <tbody>
          {Viajes.map((Viajes) => (
            <tr key={Viajes._id}>
              <td>{Viajes.origen}</td>
              <td>{Viajes.destino}</td>
              <td>{Viajes.dia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tiketes;


