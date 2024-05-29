import '../styles/tiketes.css'

// App.js (Frontend)
import { useState, useEffect } from 'react';
import axios from 'axios';

const Tiketes = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [dia, setDia] = useState('');
  // const [viajes, setViajes] = useState([]);
  const [paises, setPaises] = useState([]);
  const [viajesData, setViajesData] = useState([]);
  
  const handleSelectOrigen = (e) =>{
    const option = e.target.value;
    setOrigen(option);
  }

  const handleSelectDestino = (e) =>{
    const option = e.target.value;
    setDestino(option);
  }

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`https://tiketes-vuelos-backend.vercel.app/v3/tiket/countries`);
        // setViajes(response.data);
        setPaises(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlights();
    getViajesData();
  }, );
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ORIGEN ", origen)
    console.log("DESTINO ", destino)
    try {
      await axios.post('https://tiketes-vuelos-backend.vercel.app/v3/tiket/Viajes', { origen, destino, dia });
      setOrigen('');
      setDestino('');
      setDia('');
      window.location.reload(); // Actualizar la lista de vuelos
    }catch (err) {
      console.error(err);
    }
  };

  const getViajesData = async () => {
    const response = await axios.get('https://tiketes-vuelos-backend.vercel.app/v3/tiket/viajes');
    console.log(response.data);
    console.log (viajesData);
    setViajesData(response.data);
  }

  return (
    <div className='Tikete-contenido'>
      <br></br>
      <h1>Formulario de Tiquetes de Avión</h1>
      <form onSubmit={handleSubmit}>
        <div className="row align-items-start">
          <div className="col">
            <h6>Origen</h6>
            <select onClick={handleSelectOrigen} name="paisOrigen">
              {paises.map((pais)=>(<option value={pais.name} key={pais.name}>{pais.name}</option>))}
            </select>
          </div>
        
         <div className="col">
            <h6>Destino</h6>
            <select onClick={handleSelectDestino}  name="paisDestino">
             {paises.map((pais)=>(<option value={pais.name} key={pais.name}>{pais.name}</option>))}
           </select>
         </div>

         <div className="col">
            <h6>Dia</h6>
            <input type="date" value={dia} onChange={(e) => setDia(e.target.value)} />
         </div>
        </div> 
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
          {viajesData.map((viajes) => (
            <tr key={viajes._id}>
              <td>{viajes.origen}</td>
              <td>{viajes.destino}</td>
              <td>{viajes.dia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tiketes;


