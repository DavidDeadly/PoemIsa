import { Subject, delay, map, throttleTime } from 'rxjs';
import { useMemo } from 'react';
import { Player } from '@react-native-community/audio-toolkit';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import { PoetryQuotesFS } from '@/types/models/poetryQuotes';
import { useRandomQuote } from '@/hooks/useRandomQuote';
import { useSubscription } from 'observable-hooks';

export const useFlipQuoteEffects = ({ delayEffect = 0, delayClick = 500 }) => {
  const { randomQuote, getAnotherQuote } = useRandomQuote();
  const pageFlipSubject$ = useMemo(() => new Subject<PoetryQuotesFS>(), []);
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }]
    };
  });

  const startFlipEffect = () => {
    const sound = new Player('pageflip.mp3');
    sound.play();

    const rotationDuration = delayEffect / 2;
    rotation.value = withSequence(
      withTiming(360, {
        duration: rotationDuration,
        easing: Easing.cubic
      }),
      withTiming(0, {
        duration: rotationDuration,
        easing: Easing.ease
      })
    );
  };

  useSubscription(
    pageFlipSubject$.pipe(
      throttleTime(delayClick),
      map(quote => {
        startFlipEffect();
        return quote;
      }),
      delay(delayEffect)
    ),
    getAnotherQuote
  );

  const flipPoetry = () => randomQuote && pageFlipSubject$.next(randomQuote);

  return { randomQuote, flipPoetry, animatedStyle };
};
