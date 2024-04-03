import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import dbPedidos from 'C:/Users/57314/OneDrive/Documentos/UniC/React/api-json/db/pedidos.json';

function DataTableExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simular una solicitud HTTP para obtener los datos del archivo JSON
    setData(dbPedidos);
  }, []);

  const columns = [
    {
      name: 'Num Pedido',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Mesero',
      selector: 'mesero',
      sortable: true,
    },
    {
      name: 'Producto',
      selector: 'productos',
      sortable: true,
    },
  ];

  return (
    <div>
      <h1>Tabla de Pedidos</h1>
      <DataTable
        title="Pedidos"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </div>
  );
}

export default DataTableExample;


