import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeAdmin({ callback }) {
  const [seleccion, setSeleccion] = useState('');
  const goTo = useNavigate();

  const handleSelect = (event) => {
    setSeleccion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (seleccion === 'Inspecionar Productos') {
      goTo('/homeAdmin/modulos/admini');
    } else if (seleccion === 'Seguimiento de Pedidos') {
      goTo('/homeAdmin/modulos/admins');
    } else if (seleccion === 'Administrar Usuarios') {
      goTo('/homeAdmin/modulos/adminu');
    } else {
      alert('Por favor, selecciona una opción.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Seleccione una opción:</h1>
      <select value={seleccion} onChange={handleSelect}>
        <option value="">Seleccionar</option>
        <option value="Administrar Usuarios">Administrar Usuarios</option>
        <option value="Inspecionar Productos">Inspecionar Productos</option>
        <option value="Seguimiento de Pedidos">Seguimiento de Pedidos</option>
      </select>
      <br />
      <button type="submit">Ir</button>
    </form>
  );
}

export default HomeAdmin;


/*import './styles/homeCocina.css'
import React from 'react';


function HomeAdmin() {
  const handleSelect = (event) => {
    const selectedOption = event.target.value;
    // Aquí puedes manejar la lógica para redirigir al usuario según la opción seleccionada
    console.log('Opción seleccionada:', selectedOption);
  };

  const goHome = () => {
    // Aquí puedes definir la lógica para volver a la página de inicio
    console.log('Ir a la página de inicio');
  };

  return (
    <div className="container">
      <h3 id="txtSeleccionPage">Elegir una opción:</h3>
      <select id="selectModulo" onChange={handleSelect}>
        <option value="0">Seleccionar</option>
        <option value="AdminU">Administrar Usuarios</option>
        <option value="AdminI">Inspecionar Productos</option>
        <option value="AdminS">Seguimiento de Pedidos</option>
      </select>
      <button id="btnHome" onClick={goHome}>Inicio</button>
    </div>
  );
}

export default HomeAdmin;


/*import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from 'react'
import "./styles/homeAdmin.css";

function homeAdmin({user}){
  if(user!=="user" || !user){
      return <Navigate to="/"/>
  }
  const home = useNavigate();
  const [Modulo, setModulo] = useState('');

  function goHome(){
      home("/");
  }

  async function handleSelect(event){
    const modulo = event.target.value;
    if(modulo!=="0"){
        fetch(`http://localhost:5173/v1/sitio/${Modulo}`)
            .then(response => response.json())
            .then(responseData => setModulo(responseData))
    } 
}

return (
  <div className="container">
      <div id="txtSeleccionPage"><h3>Elegir un Modulo</h3></div>
      <select id="selectModulo" onClick={handleSelect}>
          <option value="0">Selecionar</option>
          <option value="AdminU">Administrar U</option>
          <option value="AdminI">Inspecionar P</option>
          <option value="AdminS">Seguimiento P</option>
      </select>
      <TextSigno texto={Modulo}/>
      <button id="btnHome" onClick={goHome}>Home</button>
  </div>
)
}

export default homeAdmin;*/