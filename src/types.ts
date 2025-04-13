import { VIBES } from './constants/vibes';

export interface Pin {
  id: string;
  coordinates: [number, number];
  description: string;
  vibe: keyof typeof VIBES;
  image?: string;
  author: string;  // Add author field
  createdAt: string;  // Add date field
}
