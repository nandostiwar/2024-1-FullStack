import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({user}) {
    if (user !== "user" || !user) {
        return <Navigate to="/"/>
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [mensajeError, setMensajeError] = useState(''); // Estado para almacenar el mensaje de error

    function goHome() {
        home("/");
    }

    async function handleSelect(event) {
        const signo = document.getElementById("selectSignos").value;
        const tipo = event.target.value;
        
        if (signo !== "0" && tipo !== "*") {
            // Realiza la solicitud fetch con el signo seleccionado
            fetch(`http://localhost:4000/v1/signos/${signo}`)
                .then(response => response.json())
                .then(data => {
                    console.log({data})
                    // Utiliza tanto `signo` como `tipo` para obtener el mensaje específico
                    const mensajeDelSigno = data[tipo];
                    setTextoSigno(mensajeDelSigno); // Actualiza el estado con el mensaje correspondiente
                    console.log(mensajeDelSigno);
                })
                .catch(error => console.error('Error al obtener el texto del signo:', error));
            setMensajeError(''); // Reinicia el mensaje de error si la selección es válida
        } else {
            setMensajeError('Por favor, selecciona un signo y un tipo válidos.');
        }
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <div className="controls-container">
                <div className="select-container">
                    <select id="selectSignos">
                        <option value="0">Seleciona un signo zodiacal</option>
                        <option value="Aries">Aries</option>
                        <option value="Geminis">Géminis</option>
                        <option value="Cancer">Cáncer</option>
                        <option value="Leo">Leo</option>
                        <option value="Virgo">Virgo</option>
                        <option value="Libra">Libra</option>
                        <option value="Escorpio">Escorpio</option>
                        <option value="Sagitario">Sagitario</option>
                        <option value="Capricornio">Capricornio</option>
                        <option value="Acuario">Acuario</option>
                        <option value="Piscis">Piscis</option>
                    </select>
                </div>
                <div className="select-container">
                    <select id="selecttipo" onChange={handleSelect}>
                        <option value="*">que eres?...</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Niño">Niño</option>
                    </select>
                </div>
            </div>
            {mensajeError && <div className="error-message">{mensajeError}</div>}
            <TextSigno texto={textoSigno}/>
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    )
}

export default UserHome;
