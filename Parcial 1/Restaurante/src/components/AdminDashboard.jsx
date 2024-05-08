
import Card from './Card'; // Asegúrate de que la ruta de importación es correcta
import './AdminDashboard.css'; // Estilos para el layout de las cards
import { useNavigate } from "react-router-dom";
import { React, useState, useEffect } from 'react';

function AdminDashboard() {

  const navigate = useNavigate();

  function goProductos() {
    navigate("/Productos");
  }
  function goUsuarios() {
    navigate("/Usuarios");
  }
  function goPedidos() {
    navigate("/ListaPedidos");
  }

  const userImageUrl = '/images/user.webp';
  const productImageUrl = '/images/comidas.webp';
  const orderImageUrl = '/images/pedidos.webp';

  return (
    <div className="admin-dashboard">
      <Card title="Usuarios" image={userImageUrl} onClick={goUsuarios}>
        Gestiona los usuarios aquí.
      </Card>
      <Card title="Productos" image={productImageUrl} onClick={goProductos}>
        Gestiona los productos aquí.
      </Card>
      <Card title="Pedidos" image={orderImageUrl} onClick={goPedidos}>
        Gestiona los pedidos aquí.
      </Card>
    </div>
  );
}

export default AdminDashboard;
