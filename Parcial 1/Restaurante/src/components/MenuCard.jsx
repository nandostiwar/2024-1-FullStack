import React, { useState, useRef, useEffect } from 'react';
import './MenuCard.css';

function MenuCard({ item, onAgregarItem, tipo, reset }) {
  const [cantidad, setCantidad] = useState(0);
  const [mostrarComentario, setMostrarComentario] = useState(false);
  const comentario = useRef(""); // Usa useRef para almacenar el valor del comentario


  useEffect(() => {
    console.log(comentario.current); // Debería mostrar el elemento del DOM
  
    if (reset.flag) {
      setCantidad(0);
      if (comentario.current && comentario.current.value !== undefined) {
        comentario.current.value = "";
      }
      if (reset.hideComment) {
        setMostrarComentario(false);
      }
    }
  }, [reset]);
  


  const handleAgregar = () => {
    onAgregarItem({
      idItem: item.id,
      tipo: tipo,
      cantidad: cantidad,
      comentario: comentario.current.value, // Obtiene el valor actual del textarea
      precioUnitario: parseFloat(item.price.replace('$', ''))
    });
  };

  const incrementar = () => {
    setCantidad(cantidad + 1);
    // Considera llamar a handleAgregar aquí si quieres agregar automáticamente al incrementar
  };
  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
      // Considera llamar a handleAgregar aquí si quieres ajustar automáticamente al decrementar
    }
  };
  const toggleComentario = () => setMostrarComentario(!mostrarComentario);

  return (
    <div className="menu-card">
      <img src={`/images/${item.imageUrl}`} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p className="price">{item.price}</p>
      <div className="contador">
        <button onClick={decrementar}>-</button>
        <span>{cantidad}</span>
        <button onClick={incrementar}>+</button>
      </div>
      <textarea ref={comentario} placeholder="Escribe tu comentario aquí..."></textarea>
      <button className="button" onClick={handleAgregar}>Agregar al Pedido</button>
    </div>
  );
}

export default MenuCard;
