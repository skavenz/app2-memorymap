import React from 'react';
import { Pin } from '../types';

interface PinMarkerProps {
  pin: Pin;
  style?: React.CSSProperties;
}

const PinMarker: React.FC<PinMarkerProps> = ({ pin, style }) => {
  return (
    <div 
      className="pin-popup"
      style={{
        padding: '1rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        ...style
      }}
    >
      <h3>{pin.title}</h3>
      <div className="vibe-tag">
        <span>{VIBES[pin.vibe].emoji}</span>
      </div>
      {pin.image && (
        <div className="mt-2">
          <img 
            src={pin.image} 
            alt="Memory" 
            className="w-full h-32 object-cover rounded"
          />
        </div>
      )}
      <p className="mt-2">{pin.description}</p>
      {pin.images && pin.images.length > 0 && (
        <div className="images-preview">
          {pin.images.slice(0, 3).map((img, i) => (
            <img 
              key={i} 
              src={img} 
              alt={`${pin.title} - ${i + 1}`}
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PinMarker;