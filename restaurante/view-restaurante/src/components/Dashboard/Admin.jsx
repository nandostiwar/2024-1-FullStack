import './../styles/DashboardAdmin.css'

import AdminUsers from './Admin/Users'
import AdminProducts from './Admin/Products'

function DashboardAdmin(){
    return (
        <div className="dashboardAdmin">
            <div className='d-flex'>
                <div className='col-7'>
                    <AdminUsers />
                </div>
                <div className='col-5'>
                    <AdminProducts />
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin;