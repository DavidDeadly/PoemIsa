import { PoemRepository } from '@/repositories';
import { PoemDB, PoemData } from '@/types/models/poem';
import { firebase } from '@react-native-firebase/functions';

export const getAllPoems = (lastPoemId?: string) => {
  const poemRepository = PoemRepository.init();

  return poemRepository.getPoems({ lastPoemId });
};

export const getPoemsByUser = (usedId: string) => {
  const poemRepository = PoemRepository.init();

  return poemRepository.getPoemsByUser(usedId);
};

export const createPoemDB = (poem: PoemData) => {
  const poemRepository = PoemRepository.init();

  const newPoem: PoemDB = {
    ...poem,
    likes: [],
    createdAt: firebase.firestore.Timestamp.fromDate(new Date())
  };

  return poemRepository.createPoem(newPoem);
};

export const getPoemById = (poemId?: string) => {
  if (!poemId) return Promise.reject('Required poemId');
  const poemRepository = PoemRepository.init();

  return poemRepository.getPoemById(poemId);
};

export const unlikePoem = (poemId: string, userId: string) => {
  const poemRepository = PoemRepository.init();

  return poemRepository.unlikePoem(poemId, userId);
};

export const likePoem = (poemId: string, userId: string) => {
  const poemRepository = PoemRepository.init();

  return poemRepository.likePoem(poemId, userId);
};
