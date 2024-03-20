import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";

function AdminHome({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }

    function goUsuarios(){
        home("/UsuariosHome");
    }
    function goMesas(){
        home("/MesasHome");
    }
    function goProductos(){
        home("/ProductosHome");
    }

    function handleClick(e){
        // console.log(signoEditar);
        // console.log(textoEditar);
        e.preventDefault();
        fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"textoEditar": textoEditar})
        })
    }

    return (
        <div className="container">
            
            <br /><img src='src/components/logo.png' height={100}/>
            <h3 id="txtBienvenida">RESTAURANTE CALI ES CALI<br />(Administración de Usuarios)</h3>

        </div>
    )
}

export default AdminHome;