import { useEffect, useState } from 'react';

function DashboardCocina(){
    const [sales, setSales] = useState([]);
    async function getSales() {
        try {
            const response = await fetch(`https://restaurante-api-delta.vercel.app/v1/restaurant/sales`);
            const responseData = await response.json();
            setSales(responseData);
        } catch (error) {
            console.error('Error cargando ventas:', error);
        }
    }

    const EditOrder = (order) => {
        order.estado = 'listo';

        fetch(`https://restaurante-api-delta.vercel.app/v1/restaurant/sale`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(order)
        })
        .then(response =>  response.json())
        .then(data => {
            const updatedSales = sales.map(s => s.id === data.id ? data : s);
            setSales(updatedSales);
            console.log("se edito cambio de estado la orden");
        });
    }

    useEffect(() => {
        getSales();
    }, []);

    return (
        <div className="dashboardCocina p-2">
            <h4>Cocina tiene los Siguientes Pedidos</h4>

            <table className="table table-cocina">
                <thead>
                    <tr>
                        <th width="10%">Mesa</th>
                        <th width="70%">Pedido</th>
                        <th width="20%">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.filter(sale => sale.estado === "proceso").map((sale, index) => (
                    <tr key={index}>
                        <td className='align-middle'>{sale.mesa}</td>
                        <td className='align-middle'>
                            <ul>
                                {sale.productos.map((product, i) => (
                                    <li key={i}>
                                        {product.cantidad} - {product.producto}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td className='align-middle'>
                            <div className="d-grid gap-2">
                            <button className="btn btn-secondary btn-secondary-violet" type="button" onClick={() => EditOrder(sale)}>Listo</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardCocina;