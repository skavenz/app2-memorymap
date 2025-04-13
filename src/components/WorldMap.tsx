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
          <Marker 
            key={pin.id} 
            position={pin.coordinates}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup()
            }}
          >
            <Popup maxWidth={500} className="instagram-popup">
              <div className="p-4 w-[450px]">
                {pin.image && (
                  <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                    <img 
                      src={pin.image} 
                      alt="Memory" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-semibold">{pin.author}</div>
                  <div className="text-xs text-gray-500">•</div>
                  <div className="text-xs text-gray-500">{pin.createdAt}</div>
                </div>
                <h3 className="font-bold text-lg mb-2">{pin.title}</h3>
                <p className="text-sm">
                  <span className="mr-2">{VIBES[pin.vibe].emoji}</span>
                  {pin.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
