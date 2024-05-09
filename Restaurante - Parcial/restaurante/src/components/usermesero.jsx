import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import './styleshtml/usermesero.css'

function Usermesero({user}){
    if(user!=="mesero" || !user){
        return <Navigate to="/"/>
    }

    function goHome(){
        home("./");
    }

    return(
        <div class="container">
            <h1>Mesero</h1>

            <label for="">Mesa</label>
            <select name="role">
                <option value="mesa1">mesa 1</option>
                <option value="mesa2">mesa 2</option>
                <option value="mesa3">mesa 3</option>
            </select>

            <label for="">Producto</label>
            <select name="role">
                <option value="pizza">pizza</option>
                <option value="calzone">calzone</option>
                <option value="salchipapa">salchipapa</option>
            </select>


            <label for="">Cantidad</label>
            <input type="number" placeholder=""></input>

            <a href=""><button>GUARDAR</button></a>

            <h1>Lista de Ventas</h1>
            <table>
                <tr>
                    <th>Mesa</th>
                    <th>Producto</th>
                    <th>Precio</th>
                </tr>
            </table>
            <button href="">Home</button>
        </div>
        
        
    )

}

export default Usermesero;