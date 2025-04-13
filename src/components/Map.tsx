import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Memory {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

function MapEvents({ onMapClick }: { onMapClick: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function Map() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [newMemoryForm, setNewMemoryForm] = useState<{
    latitude: number;
    longitude: number;
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    const response = await fetch('/api/memories');
    const data = await response.json();
    setMemories(data);
  };

  const handleMapClick = (latlng: L.LatLng) => {
    setNewMemoryForm({
      latitude: latlng.lat,
      longitude: latlng.lng,
      title: '',
      description: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryForm) return;

    const response = await fetch('/api/memories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMemoryForm),
    });

    if (response.ok) {
      fetchMemories();
      setNewMemoryForm(null);
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/memories?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchMemories();
    }
  };

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents onMapClick={handleMapClick} />
        
        {memories.map((memory) => (
          <Marker key={memory.id} position={[memory.latitude, memory.longitude]}>
            <Popup>
              <div>
                <h3 className="font-bold">{memory.title}</h3>
                <p>{memory.description}</p>
                <button
                  onClick={() => handleDelete(memory.id)}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {newMemoryForm && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-2 py-1 border rounded"
                value={newMemoryForm.title}
                onChange={(e) => setNewMemoryForm({ ...newMemoryForm, title: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <textarea
                placeholder="Description"
                className="w-full px-2 py-1 border rounded"
                value={newMemoryForm.description}
                onChange={(e) => setNewMemoryForm({ ...newMemoryForm, description: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setNewMemoryForm(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
