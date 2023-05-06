import { PoetryQuotesRepository } from '@/repositories/PoetryQuotesRepository';

export const getPoetryQuotes = () => {
  const poetryQuotesRepository = PoetryQuotesRepository.init();
  return poetryQuotesRepository.getAll();
};
