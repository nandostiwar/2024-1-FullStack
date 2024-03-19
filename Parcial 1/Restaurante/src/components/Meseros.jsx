import "./Meseros.css"
import React, { useState } from 'react';
import TableSelector from './Selectormesas';
import MenuCard from './MenuCard';

// Simulación de datos del menú
const Comidas = [
    {
        id: 1,
        name: "Hamburguesa Clásica",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    {
        id: 2,
        name: "Hamburguesa Clásica",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    {
        id: 3,
        name: "Hamburguesa Clásica",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    {
        id: 4,
        name: "Hamburguesa Clásica",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    }
];
const Bebidas = [
    {
        id: 4,
        name: "Coca-Cola",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    {
        id: 4,
        name: "Cerveza",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    {
        id: 4,
        name: "Pony malta",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    {
        id: 4,
        name: "Naranjada",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    {
        id: 4,
        name: "Soda italiana",
        description: "Carne de res, queso, lechuga, tomate, cebolla, y salsa especial",
        price: "$10.99",
        imageUrl: "url-a-la-imagen-de-la-hamburguesa.jpg",
    },
    // Añade más ítems aquí...
];


function Meseros() {

    const [selectedTable, setSelectedTable] = useState(null);

    return (
        <div>
            <TableSelector onSelectTable={setSelectedTable} selectedTable={selectedTable} />
            <h2>Comidas</h2>
            <div className="menu-grid">
                {Comidas.map((item) => (
                    <MenuCard key={item.id} item={item} />
                ))}
            </div>
            <h2>Bebidas</h2>
            <div className="menu-grid">
                {Bebidas.map((item) => (
                    <MenuCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );


}

export default Meseros