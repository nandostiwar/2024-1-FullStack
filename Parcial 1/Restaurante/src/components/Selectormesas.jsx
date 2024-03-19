import React from 'react';


function Selectormesas({ onSelectTable, selectedTable }) {

    const tables = [1, 2, 3, 4, 5]; // Ejemplo de IDs de mesa

  return (
    <div className="table-selector">
      {tables.map((tableId) => (
        <button
          key={tableId}
          className={`table-button ${selectedTable === tableId ? 'selected' : ''}`}
          onClick={() => onSelectTable(tableId)}
        >
          Mesa {tableId}
        </button>
      ))}
    </div>
  );
}

export default Selectormesas;