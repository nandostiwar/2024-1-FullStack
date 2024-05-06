import { useState } from "react";

import ReactSelect from "react-select";

const origin = [
  { label: "Cali", value: "Cali" },
  { label: "Medellin", value: "Medellin" },
  { label: "Pasto", value: "Pasto" },
  { label: "popayan", value: "popayan" },
];

function Fly() {

  const handleOriginSelect = (e) => {
    console.log(e);
  };

  return (
    <>
      <nav className="bg-white p-4 ">
        <div className="container w-2/3 mx-auto flex justify-between items-center">
          <img src="src/assets/react.svg" alt="Logo" className="h-8" />
          <div className="text-xl font-semibold">Home</div>
        </div>
      </nav>
      <div className="bg-white">
        <div className="bg-[#00aff0]">
          <div className="container mx-auto p-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white" placeholder="Buscar" type="search" />
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <ReactSelect options={origin} onChange={handleOriginSelect} />
                </div>
                <div>
                  <ReactSelect options={origin} onChange={handleOriginSelect} />
                </div>
                <div>
                  <input className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full" type="date" />
                </div>
                <div>
                  <ReactSelect options={origin} onChange={handleOriginSelect} />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-500 text-white hover:bg-red-600">Reservar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Fly;
