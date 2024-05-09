import React, { useState } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import './styles/Form.css';
import countriesData from '../../../api-json/db/paises.json';

function Form() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [flights, setFlights] = useState([]);
    const [filteredOriginCountries, setFilteredOriginCountries] = useState([]);
    const [filteredDestinationCountries, setFilteredDestinationCountries] = useState([]);
    
    const handleGuardarVuelo = async () => {
        if (origin.trim() === "" || destination.trim() === "" || date === "") {
            alert("Por favor ingrese todos los campos.");
            return;
        }
        
        const newFlight = { origin, destination, date };
    
        try {
            const response = await fetch('http://localhost:5173/flights', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'paises/json'
                },
                body: JSON.stringify(newFlight)
            });
    
            if (!response.ok) {
                throw new Error('Error al guardar el vuelo');
            }
    
            // Si la respuesta es exitosa, agregar el nuevo vuelo a la lista de vuelos y limpiar los campos del formulario
            setFlights([...flights, newFlight]);
            setOrigin("");
            setDestination("");
            setDate("");
            
           
            console.log("Nuevo vuelo guardado:", newFlight);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al guardar el vuelo. Por favor, inténtalo de nuevo.');
        }
    };
    
    
    

    const filteredCountries = (input, field) => {
        const filtered = countriesData.filter(country => country.name.toLowerCase().startsWith(input.toLowerCase()));
        if (field === 'origin') {
            setFilteredOriginCountries(filtered);
        } else {
            setFilteredDestinationCountries(filtered);
        }
    };

    const handleCountrySelect = (countryName, field) => {
        if (field === 'origin') {
            setOrigin(countryName);
            setFilteredOriginCountries([]);
        } else {
            setDestination(countryName);
            setFilteredDestinationCountries([]);
        }
    };

    const handleInputChange = (value, field) => {
        if (field === 'origin') {
            setOrigin(value);
            if (value === '') {
                setFilteredOriginCountries([]);
            } else {
                filteredCountries(value, 'origin');
            }
        } else {
            setDestination(value);
            if (value === '') {
                setFilteredDestinationCountries([]);
            } else {
                filteredCountries(value, 'destination');
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="entry border rounded p-4">
                        <h2 className="mb-4">Compra de Vuelos</h2>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Origen" value={origin} onChange={(e) => handleInputChange(e.target.value, 'origin')} required />
                                <div className="country-dropdown">
                                    {filteredOriginCountries.map((country, index) => (
                                        <div key={index} onClick={() => handleCountrySelect(country.name, 'origin')}>{country.name}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Destino" value={destination} onChange={(e) => handleInputChange(e.target.value, 'destination')} required />
                                <div className="country-dropdown">
                                    {filteredDestinationCountries.map((country, index) => (
                                        <div key={index} onClick={() => handleCountrySelect(country.name, 'destination')}>{country.name}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="date" className="form-control" placeholder="Fecha" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </div>
                            <Button variant="primary" size="lg" onClick={handleGuardarVuelo}>Guardar</Button>
                        </form>
                    </div>
                </Col>
            </Row>
            {flights.length > 0 && (
                <Row className="mt-5">
                    <Col md={6}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight, index) => (
                                    <tr key={index}>
                                        <td>{flight.origin}</td>
                                        <td>{flight.destination}</td>
                                        <td>{flight.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Form;
