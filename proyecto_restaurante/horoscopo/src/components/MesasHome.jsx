import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";

function MesasHome({user}){
    const home = useNavigate();

    return (
        <div className="container">
            
            <br /><img src='src/components/logo.png' height={100}/>
            <h3 id="txtBienvenida">RESTAURANTE CALI ES CALI<br />(Administración de Mesas)</h3>

        </div>
    )
}

export default MesasHome;