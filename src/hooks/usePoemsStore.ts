import * as PoemsService from '@/services/Poems';
import { Poem, PoemData } from '@/types/models/poem';
import { create } from 'zustand';

interface PoemsStore {
  poems: Poem[];
  fillPoems: (poems: Poem[]) => void;
  createPoem: (newPoem: PoemData) => Promise<void>;
  likePoem: (poemId: string, userId: string) => Promise<void>;
  unlikePoem: (poemId: string, userId: string) => Promise<void>;
}

export const usePoemsStore = create<PoemsStore>()(set => ({
  poems: [],
  fillPoems(poems) {
    set(() => ({ poems }));
  },
  async createPoem(newPoem) {
    const createdPoem = await PoemsService.createPoemDB(newPoem);
    if (!createdPoem) return set(state => state);

    set(state => ({
      poems: [createdPoem, ...state.poems]
    }));
  },
  likePoem(poemId, userId) {
    set(state => ({
      poems: [...state.poems].map(poem => {
        const newLikes = [...poem.likes];
        if (poem.id === poemId) {
          newLikes.push(userId);
        }

        return {
          ...poem,
          likes: newLikes
        };
      })
    }));

    return PoemsService.likePoem(poemId, userId);
  },
  unlikePoem(poemId, userId) {
    set(state => ({
      poems: [...state.poems].map(poem => {
        const newLikes =
          poem.id === poemId
            ? poem.likes.filter(id => id !== userId)
            : poem.likes;

        return {
          ...poem,
          likes: newLikes
        };
      })
    }));

    return PoemsService.unlikePoem(poemId, userId);
  }
}));
