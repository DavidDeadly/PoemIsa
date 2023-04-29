import { useCallback, useEffect, useState } from 'react';
import { PoetryQuotes } from '@/types/models/poetryQuotes';
import { getPoetryQuotes } from '@/services/PoetryQuotes';
import { getRandomIndex } from '@/helpers/randomIndex';

export const useRandomQuote = () => {
  const [quotes, setQuotes] = useState<PoetryQuotes[]>([]);
  const [randomQoute, setRandomQoute] = useState<PoetryQuotes | null>(null);

  const getQuote = useCallback(() => {
    const randomIndex = getRandomIndex(0, quotes.length - 1);
    return quotes[randomIndex];
  }, [quotes]);

  useEffect(() => {
    getPoetryQuotes().then(response => {
      setQuotes(response.data);
    });
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      const quote = getQuote();
      setRandomQoute(quote);
    }
  }, [quotes, getQuote]);

  return [randomQoute] as const;
};
