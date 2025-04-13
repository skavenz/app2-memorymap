export type VibeType = 'calm' | 'energetic' | 'mysterious' | 'romantic' | 'fun';

export interface Pin {
  id: string;
  title: string;
  description: string;
  coordinates: [number, number]; // [latitude, longitude] - Changed comment to match reality
  vibe: VibeType;
  images?: string[];
}