import { Subject, delay, map, throttleTime } from 'rxjs';
import { useEffect } from 'react';
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

const pageFlipSubject$ = new Subject<PoetryQuotesFS>();
const pageFlipThrottleObservable = pageFlipSubject$.pipe(
  throttleTime(500),
  map(quote => {
    const sound = new Player('pageflip.mp3');
    sound.play();
    return quote;
  })
);

export const useLoginFlipQuote = ({ delayTime = 0 }) => {
  const { randomQuote, getAnotherQuote } = useRandomQuote();
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }]
    };
  });

  const flipPoetry = () => {
    if (randomQuote) {
      const rotationDuration = delayTime / 2;
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
      pageFlipSubject$.next(randomQuote);
    }
  };

  useEffect(() => {
    const subscription = pageFlipThrottleObservable
      .pipe(delay(delayTime))
      .subscribe(currentQuote => {
        getAnotherQuote(currentQuote);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [getAnotherQuote, delayTime]);

  return { randomQuote, flipPoetry, animatedStyle };
};
