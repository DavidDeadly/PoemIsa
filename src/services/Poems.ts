import { PoemRepository } from '@/repositories';

export const getAllPoems = () => {
  const poemRepository = PoemRepository.init();
  return poemRepository.getAllPoems();
};

export const createPoemDB = (poem: PoemData) => {
  const poemRepository = PoemRepository.init();

  const newPoem = {
    ...poem,
    likes: 0
  };

  return poemRepository.createPoem(newPoem);
};
