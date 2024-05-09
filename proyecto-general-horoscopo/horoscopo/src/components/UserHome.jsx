import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";
import axios from "axios";

function UserHome({user}){
    if(user!=="user" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [textoGenero, genero] = useState('');
    console.log(textoGenero)

    function goHome(){
        home("/");
    }

    async function handleSelect(event){
        const signo = event.target.value
        const datos = {
            signo,textoGenero
        }
        if(signo!=="0"){
            // fetch(`http://localhost:4000/v1/signos/${signo}`)
            //     .then(response => response.json())
            //     .then(responseData => setTextoSigno(responseData))
            const response = await axios.post('http://localhost:4000/v1/signos/signo', datos)
            console.log(response)
            setTextoSigno(response.data.signo)
        } 
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <select id="selectSexo" onClick={(e)=>genero(e.target.value)}>
                <option value="0">Seleciona tu sexo</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Niño">Niño</option>
                <option value="Niña">Niña</option>                     
                
            </select>

            <select id="selectSignos" onClick={handleSelect}>
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
            
            <TextSigno texto={textoSigno}/>
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    )
}

export default UserHome;