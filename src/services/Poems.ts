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
    likes: 0,
    createdAt: new Date()
  };

  return poemRepository.createPoem(newPoem);
};
