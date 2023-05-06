import { useCallback, useEffect, useState } from 'react';
import { PoetryQuotes } from '@/types/models/poetryQuotes';
import { getPoetryQuotes } from '@/services/PoetryQuotes';
import { getRandomIndex } from '@/helpers/randomIndex';

export const useRandomQuote = () => {
  const [quotes, setQuotes] = useState<PoetryQuotes[]>([]);
  const [randomQoute, setRandomQoute] = useState<PoetryQuotes | null>(null);

  const getAnotherQuote = useCallback(() => {
    const randomIndex = getRandomIndex(0, quotes.length - 1);
    const quote = quotes[randomIndex];
    setRandomQoute(quote);
  }, [quotes]);

  useEffect(() => {
    getPoetryQuotes().then(response => {
      setQuotes(response.data);
    });
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      getAnotherQuote();
    }
  }, [quotes, getAnotherQuote]);

  return { randomQoute, getAnotherQuote };
};
