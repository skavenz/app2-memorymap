export const VIBES = {
  happy: { emoji: '😊', name: 'Happy' },
  sad: { emoji: '😢', name: 'Sad' },
  excited: { emoji: '🤩', name: 'Excited' },
  calm: { emoji: '😌', name: 'Calm' },
  love: { emoji: '❤️', name: 'Love' },
  fun: { emoji: '🎉', name: 'Fun' }
} as const;

export type VibeKey = keyof typeof VIBES;
