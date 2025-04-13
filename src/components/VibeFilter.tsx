import React from 'react';
import { VIBES } from '../constants/vibes';

interface VibeFilterProps {
  selectedVibes: string[];
  onChange: (vibes: string[]) => void;
}

const VibeFilter: React.FC<VibeFilterProps> = ({ selectedVibes, onChange }) => {
  const toggleVibe = (vibeName: string) => {
    const newSelected = selectedVibes.includes(vibeName)
      ? selectedVibes.filter(v => v !== vibeName)
      : [...selectedVibes, vibeName];
    onChange(newSelected);
  };

  return (
    <div className="vibe-filter">
      {Object.entries(VIBES).map(([key, vibe]) => (
        <button
          key={key}
          className={`vibe-button ${selectedVibes.includes(key) ? 'selected' : ''}`}
          onClick={() => toggleVibe(key)}
        >
          <span className="vibe-emoji">{vibe.emoji}</span>
          <span className="vibe-name">{vibe.name}</span>
        </button>
      ))}
    </div>
  );
};

export default VibeFilter;
