export type VibeType = 'calm' | 'energetic' | 'mysterious' | 'romantic' | 'fun';

export interface Pin {
  id: string;
  title: string;
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
  vibe: VibeType;
  images?: string[];
}