import './styleshtml/Useradmin.css'
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function Useradmin({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    
    function goHome(){
        home("/");
    }

    return (
        <div class="container">
            <h1>Administrador</h1>
            <h5>Restaurante Maria Del Mar</h5>

            <h2>Producto</h2>

            <label for="">Nombre</label>
            <input type="text" placeholder="Nombre del Producto"></input>

            <label for="">Precio</label>
            <input type="text" placeholder="Precio"></input>

            <a href="Poner aqui enlace hacia la base de datos"><button>GUARDAR</button></a>

            <h2>Usuario</h2>

            <label for="">Usuario</label>
            <input type="text" placeholder="Nombre de Usuario"></input>

            <label for="">Contraseña</label>
            <input type="text" placeholder="Contraseña Segura"></input>

            <label for="">Role</label>
            <select name="role">
                <option value="admin">administrador</option>
                <option value="mesero">mesero</option>
                <option value="cocina">cocina</option>
            </select>

            <a href="ruta de acceso a la base de datos"><button>GUARDAR</button></a>

            <h1>Lista de Ventas</h1>
            <table>
                <tr>
                    <th>Mesero</th>
                    <th>Producto</th>
                    <th>Precio</th>
                </tr>
            </table>
        </div>
    )
}

export default Useradmin;