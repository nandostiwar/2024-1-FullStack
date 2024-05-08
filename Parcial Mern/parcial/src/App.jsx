import React from 'react';
import './App.css';


function App() {
    return (
        <div className="container-fluid p-0 background">
            <div className="container mt-5">
                <h1 className="text-center mb-4">Agenda de Vuelos</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="paisOrigen">País Origen</label>
                            <input type="text" className="form-control" id="paisOrigen" />
                            <ul className="list-group mt-2" id="listaPaises"></ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="paisDestino">País Destino</label>
                            <input type="text" className="form-control" id="paisDestino" />
                            <ul className="list-group mt-2" id="listaPaises"></ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha</label>
                            <input type="date" className="form-control" id="fecha" />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <button className="btn btn-primary w-100" id="guardarVuelo">Guardar Vuelo</button>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <h2 className="text-center">Reservas Guardadas</h2>
                        <ul className="list-group" id="listaReservas">
                            {/* las reservas guardadas */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
