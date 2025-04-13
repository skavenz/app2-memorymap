import React, { useState } from 'react';
import { WorldMap } from './components/WorldMap';
import { Pin } from './types';
import { VIBES, VibeKey } from './constants/vibes';

const App: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [tempCoords, setTempCoords] = useState<[number, number] | null>(null);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [editingPin, setEditingPin] = useState<Partial<Pin>>({
    title: '',
    description: '',
    vibe: undefined,
    image: undefined,
    author: '', // Add author field
  });

  const handleSavePin = () => {
    if (!tempCoords || !editingPin.vibe || !editingPin.description || !editingPin.author) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB'); // DD/MM/YYYY format

    setPins([
      ...pins,
      {
        id: Date.now().toString(),
        coordinates: tempCoords,
        title: editingPin.title || '',
        description: editingPin.description,
        vibe: editingPin.vibe,
        image: editingPin.image,
        author: editingPin.author,
        createdAt: formattedDate
      }
    ]);

    // clear everything
    setEditingPin({});
    setTempCoords(null);
    setIsAddingPin(false);
  };

  const handleCancel = () => {
    setEditingPin({});
    setTempCoords(null);
    setIsAddingPin(false);
  };

  return (
    <div className="h-screen w-full relative">
      <WorldMap
        pins={pins}
        onTempPin={setTempCoords}
        tempCoords={tempCoords}
        isAddingPin={isAddingPin}
        onCancelTempPin={handleCancel}
      />

      <button
        onClick={() => {
          if (isAddingPin) {
            handleCancel();
          } else {
            setIsAddingPin(true);
          }
        }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl transition-all z-[1000]"
      >
        {isAddingPin ? '×' : '+'}
      </button>

      {isAddingPin && tempCoords && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-xl min-w-[300px] z-[999]">
          <h3 className="text-lg font-bold mb-3">Add a Memory</h3>
          
          <div className="mb-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 border rounded"
              value={editingPin.author || ''}
              onChange={(e) => setEditingPin({ ...editingPin, author: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <select
              className="w-full px-3 py-2 border rounded"
              value={editingPin.vibe || ''}
              onChange={(e) =>
                setEditingPin({ ...editingPin, vibe: e.target.value as VibeKey })
              }
              required
            >
              <option value="">Select a vibe</option>
              {Object.entries(VIBES).map(([key, vibe]) => (
                <option key={key} value={key}>
                  {vibe.emoji} {vibe.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Describe the memory..."
              className="w-full px-3 py-2 border rounded"
              value={editingPin.description || ''}
              onChange={(e) =>
                setEditingPin({ ...editingPin, description: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setEditingPin({ ...editingPin, image: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <button
            onClick={handleSavePin}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Memory
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
