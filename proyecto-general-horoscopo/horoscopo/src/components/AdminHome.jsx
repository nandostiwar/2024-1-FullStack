import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import axios from "axios";
import { useState } from "react";

function AdminHome({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [textoGenero, setTextoGenero] = useState('');

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }

    function goHome(){
        home("/");
    }

    async function handleClick(e){
        const getsignos = await axios.post("http://localhost:4000/v1/signos/tres",{signoEditar, textoGenero, textoEditar})
            console.log(getsignos);
    }

    return (
        <div class="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <div><select id="selectGenero" onChange={(e) => setTextoGenero(e.target.value)}>
                <option value="0">Selecciona un genero</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Niño">Niño</option>
                <option value="Niña">Niña</option>
                </select></div>
            <div><select id="editSignos" onClick={handleSelect}>
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
            </select></div>
            <textarea id="textoEditar" cols="50" rows="10" onChange={(e)=> setTextoEditar(e.target.value)}>

            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    )
}

export default AdminHome;