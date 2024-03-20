import { Navigate, useNavigate } from "react-router-dom";
import './styles/ProductosHome.css'
import { useState } from "react";

function ProductosHome({user}){
    
    const home = useNavigate();

    function goHome(){
        if(confirm("¿Seguro que desea salir?") == true) {
            home("/");
          } else { }
    }

    return (
        <div className="container">
            
            <br /><img src='src/components/logo.png' height={100}/>
            <h3 id="txtBienvenida">RESTAURANTE CALI ES CALI<br />(Administración de Productos)</h3>

            <div className="containerform">
                    <h3 id="txtBienvenida">Registro de Productos</h3>
                    <input type="text" className="entry" id="nombre" placeholder="Nombre" required/><br />
                    <input type="text" className="entry" id="descripcion" placeholder="Descripción" required/><br />
                    <input type="number" className="entry" id="valor" placeholder="Valor" required/><br />
                    <button id="btnRegistrar" onClick={goHome}>Registrar</button>
            </div>

        </div>
    )
}

export default ProductosHome;