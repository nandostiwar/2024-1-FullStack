import React from 'react';
import './MenuCard.css'

function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <img src={item.imageUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p className="price">{item.price}</p>
    </div>
  );
}

export default MenuCard;