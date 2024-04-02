import { Navigate } from "react-router-dom";
import './styles/Dashboard.css'

function Dashboard({user}){
    console.log("role", user);
    // if(user!=='user' || !user){
    //     return <Navigate to="/"/>
    // }

    return (
        <div className="container">
            <h1>hola soy dashboard</h1>
        </div>
    )
}

export default Dashboard;