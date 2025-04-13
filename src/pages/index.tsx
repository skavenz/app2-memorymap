import dynamic from 'next/dynamic';

// Import Map component dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Map />
    </div>
  );
}
