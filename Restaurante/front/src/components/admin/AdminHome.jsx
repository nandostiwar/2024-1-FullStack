import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import axios from "axios";

function AdminHome({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }

    const goTo = useNavigate();

    function goHome(){
        goTo("/");
    }

    const handleRegister = () => {
        goTo("/registroHome");
    }

    const handleProductos = () => {
        goTo("/productos");
    }

    async function handleClick(e){
        const getsignos = await axios.post("http://localhost:4000/v1/signos/tres",{signoEditar, textoGenero, textoEditar})
            console.log(getsignos);
    }
    return (
        <div className="container">
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button type="button" onClick={handleRegister} id="btnRegistrar">Registrar Usuario</button>
            <button type="button" onClick={handleProductos} id="btnRegistrar">Productos</button>
            <button id="btnHomeAdmin" onClick={goHome}>Cerrar Sesion</button>
        </div>
    )
}

export default AdminHome;