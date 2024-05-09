import { useEffect, useState } from "react";
import './fly.css'
import axios from "axios";
import ReactSelect from "react-select";
import MyModal from "../../shared/modals/modal";
import BorderExample from "../../shared/loading/loading";
import Spinner from 'react-bootstrap/Spinner';

function Fly() {
  const [paises, setPaises] = useState();
  const [reservas, setReservas] = useState();
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState();
  const [datosModal, setDatosModal] = useState('Verificando la reserva');
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPaises();
    getReservas();
  }, [datosModal]);

  const getReservas = async () => {
    const response = await axios.get("http://localhost:4000/paises/getreservas");
    setReservas(response.data.payload);
  }

  const getPaises = async () => {
    try {
      const response = await axios.get("http://localhost:4000/paises/getpaises");
      const dataPaises = response.data.payload.map((pais) => {
        return {
          label: pais.name,
          value: pais.name,
        };
      });
      setPaises(dataPaises);
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  };

  const handleFechaChange = (event) => {
    const nuevaFecha = event.target.value;
    setFecha(nuevaFecha);
  };

  const handleSubmit = async () => {
    BorderExample();
    if(origen && destino && fecha) {
      setLoading(true);
      const createReserva = await axios.post("http://localhost:4000/paises/addreserva", { origen, destino, fecha });
      console.log('createReserva');
      console.log(createReserva);
      if (createReserva.data.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setDatosModal(createReserva.data.payload);
          setModalShow(true);
        }, 600);
      } else {
        setTimeout(() => {
          setLoading(false);
          setModalShow(true);
        }, 600);
      }
    }
  };

  return (
    <>
        {loading && <>
          <div className="spinner fixed">
            <Spinner animation="border" role="status"/>
          </div>
        </>}
        
      <nav className="bg-white p-4 ">
        <div className="container w-2/3 mx-auto flex justify-between items-center">
          
          <div className="text-xl font-semibold">Aerolinea don cesar</div>
        </div>
      </nav>
      <div className="bg-white">
        <div className="bg-[#ffffff] pb-4">

          <div className="container mx-auto">

            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 md:py-24 gap-8">
              <div className="w-full md:w-1/2">
                
              </div>
              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Donde tu quieras ir</h2>
                
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-4 gap-4 mb-4">
                  <ReactSelect placeholder="Origen" options={paises} onChange={(e) => setOrigen(e.value)} />
                  <ReactSelect placeholder="Destino" options={paises} onChange={(e) => setDestino(e.value)} />
                  <input value={fecha} onChange={handleFechaChange} className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full" type="date" />
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={handleSubmit} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-500 text-white hover:bg-red-600">
                  Reservar
                </button>
              </div>
            </div>

          </div>

          <div className="relative w-3/4 overflow-auto rounded-lg mx-auto pt-4">
            {reservas ? <>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-[#3B83BD] pb-4">
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Origen</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Destino</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Fecha</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {reservas.map(reserva => <>
                    <tr className="bg-[#fafbfd] pb-4">
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-500">{reserva.origen}</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-500">{reserva.destino}</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-500">{reserva.fecha}</td>
                    </tr>
                  </>)}
                </tbody>
              </table>
              </> : <>
              </>}
          </div>
        </div>
      </div>
      <MyModal show={modalShow} onHide={() => setModalShow(false)} data={datosModal}/>
    </>
  );
}

export default Fly;
