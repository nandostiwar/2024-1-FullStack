import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import './styleshtml/usercocina.css'

function Usercocina({user}){
    if(user!=="cocina" || !user){
        return <Navigate to="/"/>
    }

    function goHome(){
        goHome("/");
    }

    return(
        <div class="container">
            <h1>Pedido</h1>

            <table>
                <tr>
                    <th>Mesa</th>
                    <th>Producto</th>
                    <th>Estado</th>
                </tr>
            </table>
            <a href=""><button>GUARDAR</button></a>
        </div>
        
    )


}
export default Usercocina;