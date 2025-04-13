import type { NextApiRequest, NextApiResponse } from 'next';
import { Memory } from '../../../types/Memory';

// This is a basic example - you'll want to add your database connection here
let memories: Memory[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Return all memories
    return res.status(200).json(memories);
  }

  if (req.method === 'POST') {
    const newMemory = {
      id: Date.now().toString(),
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      title: req.body.title || 'New Memory',
      description: req.body.description || '',
      ...req.body
    };
    memories.push(newMemory);
    return res.status(201).json(newMemory);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const index = memories.findIndex(memory => memory.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Memory not found' });
    }
    
    memories.splice(index, 1);
    return res.status(200).json({ message: 'Memory deleted' });
  }

  return res.status(405).end();
}
