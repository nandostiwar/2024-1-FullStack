import React, { useState, useEffect } from 'react';


const TotalVentas = () => {
  const [ventas, setVentas] = useState([]);

  const obtenerVentas = async () => {
    try {
      const response = await fetch('http://localhost:4000/restaurante/ventasVer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al cargar las ventas: ' + response.statusText);
      }
      const data = await response.json();
      setVentas(data);
      console.log(data);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return (
    <div>
      <h2>Total de Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>Mesero</th>
            <th>Producto</th>
            <th>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td>{venta.mesero}</td>
              <td>{venta.producto}</td>
              <td>{venta.totalVentas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalVentas;
