// src/app/models/mood.types.ts

export type MoodCreatureType = 'cat'; // Add more types as needed

export interface MoodEntry {
  key: string;
  name: string;
  description?: string;
  image?: string;
  emoji?: string;
  creature: MoodCreatureType;
}

export interface MoodSet {
  creature: MoodCreatureType;
  displayName: string;
  icon: string;
  moods: MoodEntry[];
}

// Mood definitions
export const MOOD_SETS: Record<MoodCreatureType, MoodSet> = {
  cat: {
    creature: 'cat',
    displayName: 'Feline Moods',
    icon: '🐱',
    moods: [
      {
        key: 'relaxed',
        name: 'Purr-fectly Content',
        description: 'Smug and inconveniently happy',
        image: 'images/moods/cats/relaxed_cat.png', // Updated path
        creature: 'cat'
      },
      {
        key: 'connoisseur',
        name: 'Claw-some Connoisseur',
        description: 'Calculated, smug chaos',
        image: 'images/moods/cats/conneoisseur_cat.png', // Updated path
        creature: 'cat'
      },
      {
        key: 'fiesta',
        name: 'Feline Fiesta',
        description: 'Pure, unadulterated "zoomies"',
        image: 'images/moods/cats/fiesta_cat.png', // Updated path
        creature: 'cat'
      },
      {
        key: 'melancholy',
        name: 'Melancholy Maine Coon',
        description: 'Over-the-top, dramatic despair',
        image: 'images/moods/cats/melancholy_cat.png', // Updated path
        creature: 'cat'
      },
      {
        key: 'sassy',
        name: 'Sassy Sphynx',
        description: 'If I fits, I sits - with judgmental flair',
        image: 'images/moods/cats/sassy_cat.png', // Updated path
        creature: 'cat'
      },
      {
        key: 'grumpy',
        name: 'Grumpy Persian',
        description: 'Pure, focused rage',
        image: 'images/moods/cats/grumpy_cat.png', // Updated path
        creature: 'cat'
      },
      {
        key: 'curious',
        name: 'Curious Calico',
        description: 'Blank-faced, derpy curiosity',
        image: 'images/moods/cats/curious_cat.png', // Updated path
        creature: 'cat'
      },
      {
        key: 'playful',
        name: 'Playful Korat',
        description: 'Unimpressed loaf on a broomstick',
        image: 'images/moods/cats/playful_cat.png', // Updated path
        creature: 'cat'
      }
    ]
  }
};