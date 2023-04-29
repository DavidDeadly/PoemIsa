import { PoetryQuotesRepository } from '@/repositories/PoetryQuotesRepository';

const poetryQuotesRepository = new PoetryQuotesRepository();

export const getPoetryQuotes = () => {
  return poetryQuotesRepository.getAll();
};
