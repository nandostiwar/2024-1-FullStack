import { useEffect, useState } from "react";
import axios from 'axios';
import ReactSelect from "react-select";

const equipaje = [
  { label: "S", value: "S" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" }
];

function Fly() {
const [paises, setPaises] = useState();
const [origen, setOrigen] = useState();
const [destino, setDestino] = useState();
const [maleta, setMaleta] = useState();


  useEffect(() => {
    getPaises();
  },[]);

  const getPaises = async () => {
    try {
        const response = await axios.get('http://localhost:4000/paises/getpaises');
        const dataPaises = response.data.payload.map(pais => {
          return ({
            label: pais.name, value: pais.name
          })
        });
        console.log(dataPaises);
        setPaises(dataPaises);
    } catch (error) {
        console.error('Error al obtener países:', error);
    }
};

  const handleSubmit = () => {
    console.log(origen, destino, maleta);
    // const paisesSelect = axios.post('http://localhost:4000/paises/getPaisesSelect');
  };

  return (
    <>
      <nav className="bg-white p-4 ">
        <div className="container w-2/3 mx-auto flex justify-between items-center">
          <img src="src/assets/avion.png" alt="Logo" className="h-10" />
          <div className="text-xl font-semibold">Home</div>
        </div>
      </nav>
      <div className="bg-white">
        {/* <div className="bg-[#00aff0] h-screen"> */}
        <div className="bg-[#CCE3F5] h-screen">
          <div className="container mx-auto">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 md:py-24 gap-8">
            <div className="w-full md:w-1/2">
              <img
                alt="Airplane"
                className="w-full h-auto rounded-lg object-cover"
                height="400"
                src="src\assets\jet.jpg"
                style={{
                  aspectRatio: "200/100",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">ChinosLatam</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
                Explore the world with ChiLATAM, your trusted airline for seamless travel experiences across Latin America.
              </p>
              <div className="flex justify-center md:justify-start">
                <p className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">Book Now</p>
              </div>
            </div>
          </div>
            <div className="bg-white p-4 rounded-lg shadow-md" >
              {/* <div className="flex items-center justify-between mb-4">
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white" placeholder="Buscar" type="search" />
              </div> */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <ReactSelect placeholder="Origen" options={paises} onChange={(e) => setOrigen(e.value)} />
                </div>
                <div>
                  <ReactSelect placeholder="Destino" options={paises} onChange={(e) => setDestino(e.value)} />
                </div>
                <div>
                  <input className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full" type="date" />
                </div>
                <div>
                  <ReactSelect placeholder="Equipaje" options={equipaje} onChange={(e) => setMaleta(e.value)} />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={handleSubmit} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-500 text-white hover:bg-red-600">Reservar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Fly;
