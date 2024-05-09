import React, { useState, useEffect } from "react";
import GenericSelect from "./Components/select.jsx";
import TailwindDatePicker from "./Components/datePicker.jsx";
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { format } from 'date-fns';
import axios from 'axios';
import Swal from 'sweetalert2';


const columns = [
  {
    name: 'Origen',
    selector: row => row.origin,
    sortable: true,
  },
  {
    name: 'Destino',
    selector: row => row.destination,
    sortable: true,
  },
  {
    name: 'Fecha Viaje',
    selector: row => row.day,
    sortable: true,
  },
];

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [flights, setFlights] = useState([]);
  const options = countries.length > 0 ? countries[0].countries.map(country => ({
    value: country.code,
    label: `${country.name}`
  })) : [];

  // Country GET method
  useEffect(() => {
    axios.get('http://localhost:5000/api/countries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetch:', error);
      });
  }, []);

  // Fligths GET method
  useEffect(() => {
    axios.get('http://localhost:5000/api/flights')
      .then(response => {
        setFlights(response.data);
      })
      .catch(error => {
        console.error('Error fetching flights:', error);
      });
  }, []);

  // Limpiar los campos cuando los vuelos se actualizan
  useEffect(() => {
    setSelectedOrigin(null);
    setSelectedDestination(null);
    setSelectedDate(null);
  }, [flights]);

  {/*Origin*/ }
  const handleOriginChange = (option) => {
    setSelectedOrigin(option);
  };

  {/*Destination*/ }
  const handleDestinationChange = (option) => {
    setSelectedDestination(option);
  };

  {/*Date*/ }
  const handleDateChange = (date) => {
    setSelectedDate(format(date, 'dd-MM-yyyy'))
  };

  {/*Action*/ }
  const handleButtonChange = (event) => {
    const existsDestination = flights.some(flight => flight.destination === selectedDestination?.label);
    const existsDate = flights.some(flight => flight.day === selectedDate);

    if (existsDestination && existsDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya hay un vuelo con destino y fecha.',
      });
      return;
    }

    if (existsDestination) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya hay vuelo con ese destino.',
      });
      return;
    }

    if (existsDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya hay un vuelo con esa fecha.',
      });
      return;
    }

    if (!selectedOrigin || !selectedDestination || !selectedDate) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios.',
      });
      return;
    }

    // Flights POST method
    axios.post('http://localhost:5000/api/flights/create', {
      origin: selectedOrigin?.label,
      destination: selectedDestination?.label,
      day: selectedDate
    })
      .then(response => {
        setFlights([...flights, response.data]);
        Swal.fire({
          icon: 'success',
          title: 'Vuelo agregado',
          text: 'Se ha agregado el vuelo con exito',
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating ticket: ' + error,
        });
      });
  }


  return (
    <>
      <div className="container mx-auto p-6 flex flex-wrap justify-center">
        <div className="form p-6 rounded-lg mr-5">
          <div className="flex justify-center w-full mt-6">
            <h1 className="text-4xl font-bold">Comprar vuelos</h1>
          </div>
          <div className="">
            <GenericSelect
              options={options}
              placeholder={'Origen'}
              onChange={handleOriginChange}
              value={selectedOrigin}
            />
          </div>
          <div className="mt-20">
            <GenericSelect
              options={options}
              placeholder={'Destino'}
              onChange={handleDestinationChange}
              value={selectedDestination}
            />
          </div>
          <div className="mt-20">
            <TailwindDatePicker
              placeholder={"Fecha de vuelo"}
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="buttonsave font-bold py-2 px-4 rounded"
              onClick={handleButtonChange}
              form="ticket"
            >
              Guardar
            </button>
          </div>
        </div>
        <div className="logo w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
        </div>
        <div className="flex justify-center w-full mt-6">
            <h1 className="text-4xl font-bold">Próximos vuelos</h1>
          </div>
        <div className="flex justify-center w-full mt-6">
          <DataTable
            columns={columns}
            data={flights}
            highlightOnHover
          />
        </div>
      </div>
    </>
  )
}


export default App;