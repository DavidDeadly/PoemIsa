import { PoemRepository } from '@/repositories';

export const getAllPoems = () => {
  const poemRepository = PoemRepository.init();

  return poemRepository.getAllPoems();
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
    createdAt: new Date()
  };

  return poemRepository.createPoem(newPoem);
};

export const getPoemById = (poemId: string) => {
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
