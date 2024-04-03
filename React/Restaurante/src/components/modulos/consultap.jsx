//homeMesero/modulos/consultap

import React from 'react';
import data from 'C:/Users/57314/OneDrive/Documentos/UniC/React/api-json/db/pedidos.json'; // Importa el archivo JSON con los datos
import "bootstrap/dist/css/bootstrap.min.css"

function ConsultaP() {
  return (
    <table className='table table-hover'>
      <thead className='table-primary'>
        <tr>
          <th>ID</th>
          <th>Mesero</th>
          <th>Mesa</th>
          <th>Estado</th>
          <th>Productos</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.mesero}</td>
            <td>{item.mesa}</td>
            <td>{item.estado}</td>
            <td>
              {/* Itera sobre los productos */}
              <ul>
                {item.productos.map((producto, index) => (
                  <li key={index}>{producto.producto}</li> 
                ))}
              </ul>
            </td>
            <td>{item.totalventa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ConsultaP;
