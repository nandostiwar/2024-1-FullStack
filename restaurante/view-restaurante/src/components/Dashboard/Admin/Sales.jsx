import { useEffect, useState } from 'react';

function DashboardAdminSales() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getSales() {
        try {
            const response = await fetch(`http://localhost:4000/v1/restaurant/sales`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const VentData = await response.json();
            console.log('Datos recibidos:', VentData); // Log para verificar los datos recibidos
            setSales(VentData);
        } catch (error) {
            console.error('Error cargando ventas:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSales();
    }, []);

    if (loading) {
        return <div className="dashboardAdminSales p-2">Cargando...</div>;
    }

    if (error) {
        return <div className="dashboardAdminSales p-2">Error cargando ventas: {error}</div>;
    }

    const filteredSales = sales.filter(sale => sale.estado === "proceso");

    if (filteredSales.length === 0) {
        return <div className="dashboardAdminSales p-2">No hay ventas listas para mostrar.</div>;
    }

    return (
        <div className="dashboardAdminSales p-2">
            <h2>Ventas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th width="30%">Mesero</th>
                        <th width="10%">Mesa</th>
                        <th width="50%">Pedido</th>
                        <th width="10%">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale, index) => (
                        <tr key={index}>
                            <td>{sale.mesero}</td>
                            <td>{sale.mesa}</td>
                            <td>
                                <ul>
                                    {sale.productos.map((product, i) => (
                                        <li key={i}>
                                            {product.cantidad} - {product.producto}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>${sale.totalventa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DashboardAdminSales;