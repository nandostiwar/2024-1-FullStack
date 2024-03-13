import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import Swal from 'sweetalert2';

function UserHome({ user }) {
    const [tipo, setTipo] = useState('');
    const [textoSigno, setTextoSigno] = useState('');
    const home = useNavigate();

    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    function goHome() {
        home("/");
    }

    async function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0" && tipo !== "0") {
            try {
                const response = await fetch(`http://localhost:4000/v1/signos/${tipo}/${signo}`);
                if (!response.ok) {
                    throw new Error("Respuesta de red incorrecta");
                }
                const responseData = await response.json();
                setTextoSigno(responseData);
            } catch (error) {
                console.error("Error al consultar el signo:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al consultar el signo!',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } else {
            Swal.fire({
                title: 'Advertencia',
                text: 'Seleccione un tipo de persona y un signo zodiacal válidos.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>

            <select  className="select_tipo" onChange={(e) => setTipo(e.target.value)}>
                <option value="0">Seleccione su tipo</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Nino">Nino</option>
            </select>

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

            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;
