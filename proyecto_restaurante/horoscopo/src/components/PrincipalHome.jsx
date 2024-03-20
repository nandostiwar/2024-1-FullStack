import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";

function PrincipalHome({user}){

    const home = useNavigate();

    function goUsuarios(){
        home("/UsuariosHome");
    }
    function goMesas(){
        home("/MesasHome");
    }
    function goProductos(){
        home("/ProductosHome");
    }
    function goPedidos(){
        home("/PedidosHome");
    }
    function goHome(){
        if(confirm("¿Seguro que desea salir?") == true) {
            home("/");
          } else { }
    }
    
    if(user==='admin'){
        return (
            <div className="container">
                
                <br /><img src='src/components/logo.png' height={100}/>
                <h3 id="txtBienvenida">RESTAURANTE CALI ES CALI<br />(Administración)</h3>
    
                <div className="containerform">
                    <button id="btnProductos" onClick={goProductos}>Gestión de productos</button><br />
                    <button id="btnMesas" onClick={goMesas}>Gestión de mesas</button><br />
                    <button id="btnUsuarios" onClick={goUsuarios}>Gestión de usuarios</button><br />
                    <button id="btnPedidos" onClick={goPedidos}>Gestión de Pedidos</button><br />
        
                    <button id="btnSalir" onClick={goHome}>Salir</button>
                </div>
            </div>
        )
    } else if(user==='cocina'){
        return (
            <div className="container">
                
                <br /><img src='src/components/logo.png' height={100}/>
                <h3 id="txtBienvenida">RESTAURANTE CALI ES CALI<br />(Administración)</h3>
    
                <div className="containerform">
                    <button id="btnProductos" onClick={goProductos}>Gestión de productos</button><br />
                    <button id="btnMesas" onClick={goMesas}>Gestión de mesas</button><br />
                    <button id="btnPedidos" onClick={goPedidos}>Gestión de Pedidos</button><br />
    
                    <button id="btnSalir" onClick={goHome}>Salir</button>
                </div>
            </div>
        )
    } else if(user==='mesero'){
        return (
            <div className="container">
                
                <br /><img src='src/components/logo.png' height={90}/>
                <h3 id="txtBienvenida">RESTAURANTE CALI ES CALI<br />(Administración)</h3>
    
                <div className="containerform">
                <button id="btnMesas" onClick={goMesas}>Gestión de mesas</button><br />
                <button id="btnPedidos" onClick={goPedidos}>Gestión de Pedidos</button><br />
    
                <button id="btnSalir" onClick={goHome}>Salir</button>
                </div>
            </div>
        )
    }
}

export default PrincipalHome;