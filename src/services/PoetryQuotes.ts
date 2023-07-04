import { PoetryQuotesRepository } from '@/repositories';

export const getPoetryQuotes = () => {
  const poetryQuotesRepository = PoetryQuotesRepository.init();
  return poetryQuotesRepository.getAll();
};
