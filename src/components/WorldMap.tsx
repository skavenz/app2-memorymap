import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Pin } from '../types';
import { VIBES } from '../constants/vibes';

interface WorldMapProps {
  pins: Pin[];
  onAddPin?: (coordinates: [number, number], vibe: string) => void;
}

function MapClickHandler({ onAddPin, isAddingPin }: { 
  onAddPin?: (coordinates: [number, number], vibe: string) => void,
  isAddingPin: boolean
}) {
  const [tempCoords, setTempCoords] = useState<[number, number] | null>(null);

  useMapEvents({
    click: (e) => {
      if (isAddingPin) {
        const { lat, lng } = e.latlng;
        setTempCoords([lat, lng]);
      }
    },
  });

  if (tempCoords) {
    return (
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl z-[1000]">
        <h3 className="mb-2 font-bold">Select a vibe for this location:</h3>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            onAddPin?.(tempCoords, e.target.value);
            setTempCoords(null);
          }}
        >
          <option value="">Choose a vibe...</option>
          {Object.entries(VIBES).map(([key, vibe]) => (
            <option key={key} value={key}>{vibe.emoji} {vibe.name}</option>
          ))}
        </select>
        <button
          className="mt-2 w-full p-2 bg-gray-200 rounded"
          onClick={() => setTempCoords(null)}
        >
          Cancel
        </button>
      </div>
    );
  }
  return null;
}

export const WorldMap: React.FC<WorldMapProps> = ({ pins, onAddPin }) => {
  const [isAddingPin, setIsAddingPin] = useState(false);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapClickHandler onAddPin={onAddPin} isAddingPin={isAddingPin} />
        {pins.map((pin) => (
          <Marker key={pin.id} position={pin.coordinates}>
            <Popup>
              <div className="p-2 max-w-[200px]">
                <h3 className="font-bold text-md">{pin.title}</h3>
                <p className="text-sm">{VIBES[pin.vibe].emoji} {pin.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button
        onClick={() => setIsAddingPin(!isAddingPin)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl transition-all z-[1000]"
      >
        {isAddingPin ? '×' : '+'}
      </button>
    </div>
  );
};
