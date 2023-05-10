import { useMemo } from 'react';
import { PoetryQuotesFS } from '@/types/models/poetryQuotes';
import { getPoetryQuotes } from '@/services/PoetryQuotes';
import { getRandomIndex } from '@/helpers/randomIndex';
import { useObservableState } from 'observable-hooks';
import { BehaviorSubject, combineLatestWith, from, map } from 'rxjs';

export const useRandomQuote = () => {
  const getPoetryQuotes$ = useMemo(() => from(getPoetryQuotes()), []);
  const randomPoetryQuote$ = useMemo(
    () => new BehaviorSubject<PoetryQuotesFS | undefined>(undefined),
    []
  );

  const [randomQuote] = useObservableState(() =>
    getPoetryQuotes$.pipe(
      combineLatestWith(randomPoetryQuote$),
      map(([quotesData, currentQuote]) =>
        getRandomQuote(quotesData.data, currentQuote)
      )
    )
  );

  const getRandomQuote = (
    quotes: PoetryQuotesFS[],
    currentQuote?: PoetryQuotesFS
  ): PoetryQuotesFS => {
    const quoteWithOutCurrentQuote = currentQuote
      ? quotes.filter(quote => quote.id !== currentQuote.id)
      : quotes;
    const randomIndex = getRandomIndex(0, quoteWithOutCurrentQuote.length - 1);

    const quote = quoteWithOutCurrentQuote[randomIndex];

    return quote;
  };

  const getAnotherQuote = (currentQuote?: PoetryQuotesFS) =>
    randomPoetryQuote$.next(currentQuote);

  return { randomQuote, getAnotherQuote };
};
