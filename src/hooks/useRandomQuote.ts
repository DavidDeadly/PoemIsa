import { useCallback, useEffect, useState } from 'react';
import { PoetryQuotesFS } from '@/types/models/poetryQuotes';
import { getPoetryQuotes } from '@/services/PoetryQuotes';
import { getRandomIndex } from '@/helpers/randomIndex';

export const useRandomQuote = () => {
  const [quotes, setQuotes] = useState<PoetryQuotesFS[]>([]);
  const [randomQuote, setRandomQoute] = useState<PoetryQuotesFS>();

  const getAnotherQuote = useCallback(
    (currentQuote?: PoetryQuotesFS) => {
      const quoteWithOutCurrentQuote = currentQuote
        ? quotes.filter(quote => quote.id !== currentQuote.id)
        : quotes;
      const randomIndex = getRandomIndex(
        0,
        quoteWithOutCurrentQuote.length - 1
      );

      const quote = quoteWithOutCurrentQuote[randomIndex];
      setRandomQoute(quote);
    },
    [quotes]
  );

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

  return { randomQuote, getAnotherQuote };
};
