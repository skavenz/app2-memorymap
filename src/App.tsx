import React, { useState } from 'react';
import { WorldMap } from './components/WorldMap';
import { Pin } from './types';
import { VIBES, VibeKey } from './constants/vibes';

const App: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [editingPin, setEditingPin] = useState<Pin | null>(null);

  const handleAddPin = (coordinates: [number, number], vibe: VibeKey) => {
    const newPin: Pin = {
      id: Date.now().toString(),
      coordinates,
      title: '',
      description: '',
      vibe
    };
    setEditingPin(newPin);
  };

  const handleSavePin = (pin: Pin) => {
    setPins([...pins, pin]);
    setEditingPin(null);
  };

  return (
    <div className="h-screen w-full relative">
      <WorldMap pins={pins} onAddPin={handleAddPin} />

      {editingPin && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-xl min-w-[300px] z-[999]">
          <h3 className="text-lg font-bold mb-3">New Memory Pin</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSavePin(editingPin);
          }}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-3 py-2 border rounded"
                value={editingPin.title}
                onChange={(e) => setEditingPin({ ...editingPin, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Description"
                className="w-full px-3 py-2 border rounded"
                value={editingPin.description}
                onChange={(e) => setEditingPin({ ...editingPin, description: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <select
                className="w-full px-3 py-2 border rounded"
                value={editingPin.vibe}
                onChange={(e) => setEditingPin({ ...editingPin, vibe: e.target.value as keyof typeof VIBES })}
              >
                {Object.entries(VIBES).map(([key, vibe]) => (
                  <option key={key} value={key}>
                    {vibe.emoji} {vibe.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingPin(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
