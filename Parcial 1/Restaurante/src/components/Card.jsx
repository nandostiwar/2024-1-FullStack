import React from 'react';
import './Card.css'; // Asegúrate de que la ruta de importación es correcta

function Card({ title, children, image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {image && <img src={image} alt={title} className="card-image" />}
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default Card;
