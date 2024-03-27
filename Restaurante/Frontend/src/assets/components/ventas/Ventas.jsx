import React, { useState, useEffect } from 'react';

const TotalVentas = () => {
  // Estado para almacenar los datos de las ventas
  const [ventas, setVentas] = useState([]);

  // Función para obtener los datos de las ventas
  const obtenerVentas = async () => {
    try {
      // Aquí realizarías la solicitud a tu API para obtener los datos de las ventas
      // Por ahora, usaremos datos de ejemplo
      const datosEjemplo = [
        { mesero: 'Juan', producto: 'Pizza', cantidad: 5, total: 100 },
        { mesero: 'María', producto: 'Hamburguesa', cantidad: 3, total: 75 },
        { mesero: 'Pedro', producto: 'Ensalada', cantidad: 2, total: 30 },
      ];
      setVentas(datosEjemplo);
    } catch (error) {
      console.error('Error al obtener los datos de las ventas:', error);
      // Aquí podrías manejar el error de acuerdo a tus necesidades
    }
  };

  // Llamar a la función obtenerVentas cuando el componente se monte
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
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td>{venta.mesero}</td>
              <td>{venta.producto}</td>
              <td>{venta.cantidad}</td>
              <td>{venta.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalVentas;