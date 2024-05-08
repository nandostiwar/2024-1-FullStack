import { useNavigate } from "react-router-dom";

import './styles/Dashboard.css'

function Dashboard(){
    return (
        <div className="dashboard">
            <div className='dashboard__content m-3'>
                <div className="dashboard__content_left m-3">
                    <div className="mb-3">
                        <label for="origen" className="form-label">Origen</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="dashboard__content_right m-3">
                    <div className="mb-3">
                        <label for="destino" className="form-label">Destino</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>
            <div className='dashboard__content m-3'>
                <div className="dashboard__content_left m-3">
                    <div className="mb-3">
                        <label for="day" className="form-label">Dia</label>
                        <input type="date" className="form-control" />
                    </div>
                </div>
                <div className="dashboard__content_right m-3">
                    <div className="mb-3">
                        <label for="guardar" className="form-label">&nbsp;</label>
                        <div><button type="button" className="btn btn-primary">Guardar</button></div>
                    </div>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Dia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Origen 1</td>
                        <td>Destino 1</td>
                        <td>Dia</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;