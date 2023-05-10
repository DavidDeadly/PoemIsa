import { PoetryQuotesFS } from '@/types/models/poetryQuotes';
import { Subject, throttleTime } from 'rxjs';
import { useRandomQuote } from './useRandomQuote';
import { useEffect } from 'react';
import { Player } from '@react-native-community/audio-toolkit';

const pageFlipSubject$ = new Subject<PoetryQuotesFS>();
const pageFlipThrottleObservable = pageFlipSubject$.pipe(throttleTime(500));

export const useLoginPoetryFlip = () => {
  const { randomQuote, getAnotherQuote } = useRandomQuote();

  useEffect(() => {
    const subscription = pageFlipThrottleObservable.subscribe(currentQuote => {
      new Player('pageflip.mp3').play();
      getAnotherQuote(currentQuote);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [getAnotherQuote]);

  return { randomQuote, pageFlipSubject$ };
};
