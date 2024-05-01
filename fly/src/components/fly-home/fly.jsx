import { useState } from "react";

function Fly() {


  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  // Mock de datos de países para las opciones del select
  const countries = [
    'Bogotá',
    'Medellín',
    'Cali',
    // Agrega más países según sea necesario
  ];

  // Función para manejar el cambio en el campo de origen
  const handleOriginChange = (e) => {
    const userInput = e.target.value;
    setOriginInput(userInput);

    // Filtrar las opciones de origen según la entrada del usuario
    const filteredOptions = countries.filter(country =>
      country.toLowerCase().includes(userInput.toLowerCase())
    );
    setOriginOptions(filteredOptions);
  };

  // Función para manejar el cambio en el campo de destino
  const handleDestinationChange = (e) => {
    const userInput = e.target.value;
    setDestinationInput(userInput);

    // Filtrar las opciones de destino según la entrada del usuario
    const filteredOptions = countries.filter(country =>
      country.toLowerCase().includes(userInput.toLowerCase())
    );
    setDestinationOptions(filteredOptions);
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
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                  placeholder="Buscar"
                  type="search"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Origen"
                    value={originInput}
                    onChange={handleOriginChange}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                    size="5"
                    id="origin"
                  >
                    {originOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Destino"
                    value={destinationInput}
                    onChange={handleDestinationChange}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                    size="5"
                    id="destination"
                  >
                    {destinationOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                    type="date"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    role="combobox"
                    aria-controls="radix-:rlk:"
                    aria-expanded="false"
                    aria-autocomplete="none"
                    dir="ltr"
                    data-state="closed"
                    data-placeholder=""
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="luggage"
                  >
                    <span style={{ pointerEvents: 'none' }}>Equipaje</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-500 text-white hover:bg-red-600">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Fly;
