import { VIBES } from './constants/vibes';

export interface Pin {
  id: string;
  coordinates: [number, number];
  description: string;
  vibe: keyof typeof VIBES;
  image?: string;  // Add this line
}
