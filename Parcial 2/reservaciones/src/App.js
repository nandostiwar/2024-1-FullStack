import React from 'react';
import SearchForm from './component/SearchForm';
import ReservationsList from './component/FlightOptionsList';
import './App.css'; // Asegúrate de importar el estilo del contenedor

function App() {
  return (
    <div className="container"> {/* Utiliza la clase contenedor aquí */}
      <SearchForm />
      <ReservationsList />
    </div>
  );
}

export default App;

