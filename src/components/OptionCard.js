import React from 'react';
import './OptionCard.css'; // Estilos para el componente

const OptionCard = ({ imageUrl, altText, title, description, onClick }) => {
  return (
    <div className="option-card" onClick={onClick}>
      {/* Muestra la imagen */}
      <img src={imageUrl} alt={altText} className="option-card-image" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default OptionCard;
