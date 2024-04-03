import './../styles/DashboardAdmin.css'

import AdminUsers from './Admin/Users'
import AdminProducts from './Admin/Products'
import AdminSales from './Admin/Sales'

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

            <AdminSales />
        </div>
    )
}

export default DashboardAdmin;