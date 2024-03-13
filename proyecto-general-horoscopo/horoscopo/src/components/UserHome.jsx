import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import axios from "axios";
import { useState } from "react";

function UserHome({user}){
    if (user!=="user" || !user){
        console.error("Access denied: Invalid or missing user.");
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [textoGenero, setTextoGenero] = useState('');

    function goHome(){
        home("/");
    }

    async function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            const getsignos = await axios.post("http://localhost:4000/v1/signos/dos",{signo, textoGenero})
            console.log(getsignos);
            setTextoSigno(getsignos.data);
        }
    }

    return (
    <div className="container">
        <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3>
        </div>
        <div>
            <select id="selectGenero" onChange={(e) => setTextoGenero(e.target.value)}>
                <option value="0">Selecciona un genero</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Niño">Niño</option>
                <option value="Niña">Niña</option>
                </select>
                </div>
                <div>
                <select id="selectSignos" onChange={handleSelect}>
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
            <div>
                <TextSigno texto={textoSigno}/> 
                <button 
                id="btnHome" onClick={goHome}>Home
                </button>
                </div>
                </div>
                )
}

export default UserHome;