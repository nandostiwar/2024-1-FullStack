import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/home.css';

function Home() {
  // Estados para viajes
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [traveles, setTraveles] = useState([]);

  // Estados para países
  const [countries, setCountries] = useState([]);

  // Función para obtener viajes
  const getTraveles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/tiket/travel');
      setTraveles(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error al obtener los viajes:', error.message);
      
    }
  };

  // Función para agregar un viaje
  const agregarTravel = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/v1/tiket/travel', {
        origen: origen,
        destino: destino,
        data: data,
        status: true
      });
      setTraveles([...traveles, response.data]);
      setOrigen('');
      setDestino('');
      setData('');
    } catch (error) {
      console.error("Error al agregar el viaje:", error);
    }
  };

  // Función para obtener países
  const getCountries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/tiket/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error al obtener los países:', error.message);
    }
  };

  useEffect(() => {
    getTraveles();
    getCountries();
  }, []);

  
  return (
    <div className='container'>
      <div className='d-flex'>
        <div className='col Container Producto'>
          <h2>Tiquetes De Avion</h2>
          <form onSubmit={agregarTravel}>
            <div className='d-flex gap-2'>
              <div className='col'>
                <input className="form-control" list="origenOptions" placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
                <datalist id="origenOptions">
                  {countries.map((country, index) => (
                    <option key={index} value={country.name} />
                  ))}
                </datalist>
              </div>
              <div className='col'>
                <input className="form-control" list="destinoOptions" placeholder="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
                <datalist id="destinoOptions">
                  {countries.map((country, index) => (
                    <option key={index} value={country.name} />
                  ))}
                </datalist>
              </div>
              <div className='col'>
                <input type="date" className="input_date" placeholder="Dia" aria-label="Dia" value={data} onChange={(e) => setData(e.target.value)} />
              </div>
              <div className='col'>
                <button type="submit" className="btn btn-outline-light">Guardar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='Container Ventas'>
        <h2>Reservas Activas</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="table-dark"></th>
              <th className="table-dark">Origen</th>
              <th className="table-dark">Destino</th>
              <th className="table-dark">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {traveles.length > 0 && traveles.filter(travel => travel.status === true).map((travel, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{travel.origen}</td>
                <td>{travel.destino}</td>
                <td>{travel.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
