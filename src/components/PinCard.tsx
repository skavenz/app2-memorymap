import React from 'react';
import { Pin } from '../types';
import { VIBES } from '../constants/vibes';

interface PinCardProps {
  pin: Pin;
}

const PinCard: React.FC<PinCardProps> = ({ pin }) => {
  const vibe = VIBES[pin.vibe];
  
  return (
    <div className="pin-card">
      <div className="vibe-tag">
        <span className="vibe-emoji">{vibe.emoji}</span>
        <span className="vibe-name">{vibe.name}</span>
      </div>
      <div className="vibe-theme">{vibe.theme}</div>
      <div className="pin-details">
        <h3>{pin.title}</h3>
        <p>{pin.description}</p>
      </div>
    </div>
  );
};

export default PinCard;