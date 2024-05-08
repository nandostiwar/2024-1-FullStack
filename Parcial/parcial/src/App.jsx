import { useEffect, useState } from 'react';
import './App.css';
import axion from 'axios';
import Select from 'react-select'
import axios from 'axios';

function App() {
    const [allPaises, setAllPaises] = useState();
    const [allVuelos, setAllVuelos] = useState();
    const [crearVuelo, setCrearVuelo] = useState();
    const [lugarOrigen, setlugarOrigen] = useState();
    const [lugarDestino, setlugarDestino] = useState();
    const [fecha, setfecha] = useState();


    useEffect(() => {
        getPaises();
        getVuelos();
    }, [crearVuelo])


    const getVuelos = async () => {
        const vuelos = await axios.get('http://localhost:5000/obtenerVuelos');
        console.log('vuelos.data');
        console.log(vuelos.data);
        setAllVuelos(vuelos.data)
    }

    const getPaises = async () => {
        const getPaise = await axion.get('http://localhost:5000/buscarPaises');

        const paisesParse = getPaise.data.map(pais => {
            return { value: pais.name, label: pais.name }
        })
        setAllPaises(paisesParse)

        console.log('getPaise');
        console.log(getPaise);
    }

    const handleSubmit = async () => {
        const dataFly = { lugarOrigen, lugarDestino, fecha }
        const createFly = await axion.post('http://localhost:5000/crearVuelo', dataFly)
        setCrearVuelo(createFly.data);

    }

    return (
        <div className="container-fluid p-0 background">
            <div className="container mt-5">
                <h1 className="text-center mb-4">Agenda de Vuelos</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select options={allPaises} placeholder='Origen' onChange={(e) => setlugarOrigen(e.value)}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select options={allPaises} placeholder='Destino' onChange={(e) => setlugarDestino(e.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="date" className="form-control" id="fecha" onChange={(e) => setfecha(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <button className="btn btn-primary w-100" id="guardarVuelo" onClick={handleSubmit}>Guardar Vuelo</button>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <h2 className="text-center">Reservas Guardadas</h2>
                            {allVuelos ? 
                                allVuelos.map(v => <>
                                    <p>{v.lugarOrigen}</p>
                                    <p>{v.lugarDestino}</p>
                                    <p>{v.fecha}</p>
                                </>)
                            : <>
                                <p>No tienes vuelos creados</p>
                            </> }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
