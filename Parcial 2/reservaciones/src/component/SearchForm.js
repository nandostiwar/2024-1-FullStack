import React, { useState, useEffect } from 'react';
import './SearchForm.css';

function SearchForm() {
    const [paises, setPaises] = useState([]);
    const [sugerenciasOrigen, setSugerenciasOrigen] = useState([]);
    const [sugerenciasDestino, setSugerenciasDestino] = useState([]);
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [fecha, setFecha] = useState('');
    const [precio, setPrecio] = useState(''); // Asegúrate de incluir un campo para el precio

    useEffect(() => {
        fetch('http://localhost:9000/v1/reservation/paises')
            .then(response => response.json())
            .then(data => setPaises(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleInputChange = (value, setSugerencias, setCampo) => {
        setCampo(value);
        if (!value) {
            setSugerencias([]);
            return;
        }
        const filteredSuggestions = paises.filter(pais =>
            pais.name.toLowerCase().includes(value.toLowerCase())
        );
        setSugerencias(filteredSuggestions);
    };

    const handleSuggestionClick = (name, setSugerencias, setCampo) => {
        setCampo(name);
        setSugerencias([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            origen: { pais: origen },
            destino: { pais: destino },
            fecha,
            precio: Number(precio)
        };
    
        fetch('http://localhost:9000/v1/reservation/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.message);
            }
            return data;
        }))
        .then(data => {
            alert('Reservación creada con éxito: ' + JSON.stringify(data));
        })
        .catch(error => {
            alert('Error al realizar la reservación: ' + error.message);
        });
    };


    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div>
                <label>Origen:</label>
                <input
                    type="text"
                    value={origen}
                    onChange={e => handleInputChange(e.target.value, setSugerenciasOrigen, setOrigen)}
                    className="search-input"
                    placeholder="Origen"
                />
                <div className="suggestions">
                    {sugerenciasOrigen.map(pais => (
                        <div key={pais._id} onClick={() => handleSuggestionClick(pais.name, setSugerenciasOrigen, setOrigen)}>
                            {pais.name}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label>Destino:</label>
                <input
                    type="text"
                    value={destino}
                    onChange={e => handleInputChange(e.target.value, setSugerenciasDestino, setDestino)}
                    className="search-input"
                    placeholder="Destino"
                />
                <div className="suggestions">
                    {sugerenciasDestino.map(pais => (
                        <div key={pais._id} onClick={() => handleSuggestionClick(pais.name, setSugerenciasDestino, setDestino)}>
                            {pais.name}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label>Fecha:</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    className="search-input"
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="text"
                    value={precio}
                    onChange={e => setPrecio(e.target.value)}
                    className="search-input"
                    placeholder="Precio"
                />
            </div>
            <button type="submit" className="search-button">Reservar</button>
        </form>
    );
}

export default SearchForm;
