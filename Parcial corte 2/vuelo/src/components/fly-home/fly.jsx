import { useEffect, useState } from "react";
import "./fly.css";
import axios from "axios";
import ReactSelect from "react-select";
import MyModal from "../../shared/modals/modal";
import BorderExample from "../../shared/loading/loading";


function Fly() {
  const [paises, setPaises] = useState();
  const [reservas, setReservas] = useState();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [numero, setNumero] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigos, setCodigos] = useState();
  const [datosModal, setDatosModal] = useState(
    "Verificar los datos de la reserva"
  );
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPaises();
    getReservas();
  }, [datosModal]);

  const getReservas = async () => {
    const response = await axios.get(
      "http://localhost:4000/paises/getreservas"
    );
    setReservas(response.data.payload);
  };

  const getPaises = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/paises/getpaises"
      );
      const dataPaises = response.data.payload.map((pais) => {
        return {
          label: pais.name,
          value: pais.name,
        };
      });
      const dataCodigos = response.data.payload.map((codigo) => {
        return {
          label: codigo.name + " " + codigo.code,
          value: codigo.code,
        };
      });
      setPaises(dataPaises);
      setCodigos(dataCodigos);
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  };

  const handleFechaChange = (event) => {
    const nuevaFecha = event.target.value;
    setFecha(nuevaFecha);
  };
  const handleNumeroChange = (event) => {
    const nuevoNumero = event.target.value;
    setNumero(nuevoNumero);
  };

  const handleSubmit = async () => {
    BorderExample();
    if (origen && destino && codigo && fecha && numero) {
      setLoading(true);
      const createReserva = await axios.post(
        "http://localhost:4000/paises/addreserva",
        { origen, destino, codigo, fecha, numero }
      );
      console.log("createReserva");
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
      {loading && (
        <>
        </>
      )}
      <div className="bg-white">
        <div className="bg-[#D5D8DC] pb-4">
          <div className="container mx-auto">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 md:py-24 gap-8">
              <div className="w-full md:w-1/2">
              </div>
                <h1>
                  Programa tu Vuelo
                </h1>
                <div className="flex justify-center md:justify-start">
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <ReactSelect
                  placeholder="Origen"
                  options={paises}
                  onChange={(e) => setOrigen(e.value)}
                />
                <ReactSelect
                  placeholder="Destino"
                  options={paises}
                  onChange={(e) => setDestino(e.value)}
                />
                <input
                  value={fecha}
                  onChange={handleFechaChange}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                  type="date"
                />
                <ReactSelect
                  placeholder="Codigo"
                  options={codigos}
                  onChange={(e) => setCodigo(e.value)}
                />
                <input
                  value={numero}
                  placeholder="123 456 789"
                  onChange={handleNumeroChange}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                  type="tel"
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-500 text-white hover:bg-red-600"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-3/4 overflow-auto rounded-lg mx-auto pt-4">
            {reservas ? (
              <>
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        Origen
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        Destino
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        Numero telefonico
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((reserva) => (
                      <>
                        <tr className="border-b border-gray-200 dark:border-gray-800 bg-[#ffffff]">
                          <td className="px-4 py-3 text-gray-900 dark:text-gray-500">
                            {reserva.origen}
                          </td>
                          <td className="px-4 py-3 text-gray-900 dark:text-gray-500">
                            {reserva.destino}
                          </td>
                          <td className="px-4 py-3 text-gray-900 dark:text-gray-500">
                            {reserva.codigo} {reserva.numero}
                          </td>
                          <td className="px-4 py-3 text-gray-900 dark:text-gray-500">
                            {reserva.fecha}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <p>No cuentas con tiquete.</p>
              </>
            )}
          </div>
        </div>
      </div>
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={datosModal}
      />
    </>
  );
}

export default Fly;
