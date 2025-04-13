export interface Memory {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  images?: string[];
  createdAt?: Date;
}
