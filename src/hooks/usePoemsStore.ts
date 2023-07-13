import * as PoemsService from '@/services/Poems';
import { Poem, PoemData } from '@/types/models/poem';
import { create } from 'zustand';

interface PoemsStore {
  poems: Poem[];
  fillPoems: (poems: Poem[]) => void;
  fillPoem: (poem: Poem) => void;
  createPoem: (newPoem: PoemData) => Promise<void>;
  likePoem: (poemId: string, userId: string) => Promise<void>;
  unlikePoem: (poemId: string, userId: string) => Promise<void>;
}

export const usePoemsStore = create<PoemsStore>()(set => ({
  poems: [],
  fillPoem(poem) {
    set(state => ({
      poems: state.poems.map(p => (poem.id === p.id ? poem : p))
    }));
  },
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
        const newLikes = [...poem.usersLiked];
        if (poem.id === poemId) {
          newLikes.push(userId);
        }

        return {
          ...poem,
          usersLiked: newLikes,
          likes: newLikes.length
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
            ? poem.usersLiked.filter(id => id !== userId)
            : poem.usersLiked;

        return {
          ...poem,
          usersLiked: newLikes,
          likes: newLikes.length
        };
      })
    }));

    return PoemsService.unlikePoem(poemId, userId);
  }
}));
