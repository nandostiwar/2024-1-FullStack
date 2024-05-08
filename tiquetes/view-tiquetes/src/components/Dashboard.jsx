import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';

import './styles/Dashboard.css'

function Dashboard(){
    const [destino, setDestino] = useState('');
    const [origen, setOrigen] = useState('');
    const [resultsOrigen, setResultsOrigen] = useState([]);
    const [resultsDestino, setResultsDestino] = useState([]);
    const [showResultsOrigen, setShowResultsOrigen] = useState(false);
    const [showResultsDestino, setShowResultsDestino] = useState(false);
    const [shouldSearchOrigen, setShouldSearchOrigen] = useState(true);
    const [shouldSearchDestino, setShouldSearchDestino] = useState(true);
    const resultsRefOrigen = useRef(null);
    const resultsRefDestino = useRef(null);

    const handleSearchOrigen = async () => {
        if (origen && shouldSearchOrigen) {
            try {
                const response = await fetch(`http://localhost:4000/v1/tiket/country/search?text=${origen}`);
                const data = await response.json();
                setResultsOrigen(data);
                setShowResultsOrigen(true);
            } catch (error) {
                console.error('Error al realizar la búsqueda:', error);
            }
        }
    };

    const handleSearchDestino = async () => {
        if (destino && shouldSearchDestino) {
            try {
                const response = await fetch(`http://localhost:4000/v1/tiket/country/search?text=${destino}`);
                const data = await response.json();
                setResultsDestino(data);
                setShowResultsDestino(true);
            } catch (error) {
                console.error('Error al realizar la búsqueda:', error);
            }
        }
    };

    const buscarOrigen = (e) => {
        setOrigen(e.target.value);

        if (e.target.value === '') {
            setShowResultsOrigen(false);
        }

        setShouldSearchOrigen(true);
    };

    const buscarDestino = (e) => {
        setDestino(e.target.value);

        if (e.target.value === '') {
            setShowResultsDestino(false);
        }

        setShouldSearchDestino(true);
    };

    const actualizarOrigen = (nombre) => {
        setOrigen(nombre);
        setShowResultsOrigen(false);
        setResultsOrigen([]);
        setShouldSearchOrigen(false);
    };

    const actualizarDestino = (nombre) => {
        setDestino(nombre);
        setShowResultsDestino(false);
        setResultsDestino([]);
        setShouldSearchDestino(false);
    };

    const [date, setDate] = useState('');
    const assingDate = (e) => {
        setDate(e.target.value);
    };

    const [error, setError] = useState('');
    const createTravel = (event)=>{
        event.preventDefault();

        fetch(`http://localhost:4000/v1/tiket/travels`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"origen": origen, "destino": destino, "date": date})
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setOrigen('');
                setDestino('');
                setDate('');
                setTravels([...travels, data]);
                setError('');
                console.log("se creo correctamente el vuelo");
            }
        });
    }

    const [travels, setTravels] = useState([]);
    async function getTravels() {
        try {
            const response = await fetch(`http://localhost:4000/v1/tiket/travels`);
            const responseData = await response.json();
            setTravels(responseData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          handleSearchOrigen();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [origen, shouldSearchOrigen]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearchDestino();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [destino, shouldSearchDestino]);

    useEffect(() => {
        getTravels();

        function handleClickOutside(event) {
            if (resultsRefOrigen.current && !resultsRefOrigen.current.contains(event.target)) {
                setShowResultsOrigen(false);
            }

            if (resultsRefDestino.current && !resultsRefDestino.current.contains(event.target)) {
                setShowResultsDestino(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dashboard">
            <form onSubmit={createTravel}>
                <div className='dashboard__content m-3'>
                    <div className="dashboard__content_left m-3">
                        <div className="mb-3">
                            <label htmlFor="origen" className="form-label">Origen</label>
                            <input type="text" value={origen} onChange={buscarOrigen} className="form-control" />
                        </div>
                        <div ref={resultsRefOrigen} className={`result ${showResultsOrigen ? 'show' : 'hide'}`}>
                            {resultsOrigen?.map((result, index) => (
                                <div className="result__item" key={index} onClick={() => actualizarOrigen(result.name)}>{result.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className="dashboard__content_right m-3">
                        <div className="mb-3">
                            <label htmlFor="destino" className="form-label">Destino</label>
                            <input type="text" value={destino} onChange={buscarDestino} className="form-control" />
                        </div>
                        <div ref={resultsRefDestino} className={`result ${showResultsDestino ? 'show' : 'hide'}`}>
                            {resultsDestino?.map((result, index) => (
                                <div className="result__item" key={index} onClick={() => actualizarDestino(result.name)}>{result.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='dashboard__content m-3'>
                    <div className="dashboard__content_left m-3">
                        <div className="mb-3">
                            <label htmlFor="day" className="form-label">Dia</label>
                            <input type="date" className="form-control" value={date} onChange={assingDate} />
                        </div>
                    </div>
                    <div className="dashboard__content_right m-3">
                        <div className="mb-3">
                            <label htmlFor="guardar" className="form-label">&nbsp;</label>
                            <div><button className="btn btn-primary-white" type="submit">Guardar</button></div>
                        </div>
                    </div>
                </div>
            </form>

            {error && <div className="alert alert-danger m-4" role="alert">
                {error}
            </div>}

            <div className="m-4">
                <h1>Lista de vuelos</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Dia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {travels.map((travel, index) => (
                        <tr key={index}>
                            <td>{travel.origen}</td>
                            <td>{travel.destino}</td>
                            <td>{travel.date}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;