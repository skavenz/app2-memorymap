import { VIBES } from './constants/vibes';

export interface Pin {
  id: string;
  coordinates: [number, number];
  title: string;
  description: string;
  vibe: keyof typeof VIBES;
}
