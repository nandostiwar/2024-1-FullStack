import { useNavigate } from "react-router-dom";

import './styles/Dashboard.css'

import DashboardAdmin from './Dashboard/Admin'
import DashboardCocina from './Dashboard/Cocina'
import DashboardMesero from './Dashboard/Mesero'

function Dashboard({user}){
    const home = useNavigate();

    function goHome(){
        home("/");
    }

    return (
        <div className="dashboard">
            <div className='dashboard__toolbar row'>
                <div className='col d-flex gap-3 align-items-center'>
                    <div className='dashboard__toolbar_picture'></div>
                    <div>{user.user}</div>
                </div>
                <div className='col d-flex justify-content-end align-items-center'>
                    <button type="button" className="btn btn-link" onClick={goHome}>Salir</button>
                </div>
            </div>
            <div className='dashboard__content'>
                {user.role === 'admin' && <DashboardAdmin />}
                {user.role === 'cocina' && <DashboardCocina />}
                {user.role === 'mesero' && <DashboardMesero />}
            </div>
        </div>
    )
}

export default Dashboard;