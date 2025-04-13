import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Pin } from '../types';
import { VIBES } from '../constants/vibes';

interface WorldMapProps {
  pins: Pin[];
  onTempPin?: (coordinates: [number, number]) => void;
  isAddingPin: boolean;
  tempCoords: [number, number] | null;
  onCancelTempPin: () => void;
}

function MapClickHandler({
  onTempPin,
  isAddingPin
}: {
  onTempPin?: (coordinates: [number, number]) => void;
  isAddingPin: boolean;
}) {
  useMapEvents({
    click: (e) => {
      if (isAddingPin) {
        const { lat, lng } = e.latlng;
        onTempPin?.([lat, lng]);
      }
    }
  });

  return null;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  pins,
  onTempPin,
  isAddingPin,
  tempCoords,
  onCancelTempPin
}) => {
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

        <MapClickHandler onTempPin={onTempPin} isAddingPin={isAddingPin} />

        {tempCoords && (
          <Marker position={tempCoords}>
            <Popup>
              Temporary Pin
            </Popup>
          </Marker>
        )}

        {pins.map((pin) => (
          <Marker key={pin.id} position={pin.coordinates}>
            <Popup>
              <div className="p-2 max-w-[200px]">
                <h3 className="font-bold text-md">{pin.title}</h3>
                <p className="text-sm">
                  {VIBES[pin.vibe].emoji} {pin.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
