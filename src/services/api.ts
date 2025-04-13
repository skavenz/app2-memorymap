import { Memory } from '../types/Memory';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = {
  getMemories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/memories`);
      if (!response.ok) throw new Error('Failed to fetch memories');
      return response.json();
    } catch (error) {
      console.error('Error fetching memories:', error);
      throw error;
    }
  },

  createMemory: async (memory: Omit<Memory, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memory),
      });
      if (!response.ok) throw new Error('Failed to create memory');
      return response.json();
    } catch (error) {
      console.error('Error creating memory:', error);
      throw error;
    }
  },

  uploadImages: async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload images');
      return response.json();
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }
};
