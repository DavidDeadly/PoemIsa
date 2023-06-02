import { useObservable, useObservableState } from 'observable-hooks';
import {
  BehaviorSubject,
  catchError,
  combineLatestWith,
  from,
  map,
  of
} from 'rxjs';

import { getPoetryQuotes } from '@/services';
import { getRandomIndex } from '@/helpers';
import { PoetryQuoteFSError } from '@/models';

export const useRandomQuote = () => {
  const getPoetryQuotes$ = useObservable(() => from(getPoetryQuotes()), []);
  const randomPoetryQuote$ = useObservable(
    () => new BehaviorSubject<PoetryQuotesFS | undefined>(undefined),
    []
  );

  const [randomQuote] = useObservableState(() =>
    getPoetryQuotes$.pipe(
      catchError(() => of(PoetryQuoteFSError)),
      combineLatestWith(randomPoetryQuote$),
      map(([quotesData, currentQuote]) => {
        return quotesData.data.length
          ? getRandomQuote(quotesData.data, currentQuote)
          : PoetryQuoteFSError.data.at(0);
      })
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
