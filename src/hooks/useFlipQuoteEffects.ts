import { Subject, delay, map, throttleTime } from 'rxjs';
import { useObservable, useSubscription } from 'observable-hooks';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import { useRandomQuote } from '@/hooks';
import { getSoundPrepared } from '@/helpers';
import { PoetryQuoteFSError } from '@/models';

export const useFlipQuoteEffects = ({ delayEffect = 0, delayClick = 500 }) => {
  const { randomQuote, getAnotherQuote } = useRandomQuote();
  const pageFlipSubject$ = useObservable(
    () => new Subject<PoetryQuotesFS | undefined>(),
    []
  );
  const pageFlipSound$ = useObservable(
    () => getSoundPrepared('pageflip.mp3'),
    []
  );
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }]
    };
  });

  const startFlipEffect = () => {
    pageFlipSound$.subscribe({
      next: sound => {
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
      },
      error: error => console.log('Error playing the pageflip sound: ', error)
    });
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

  const flipPoetry = () =>
    randomQuote?.id !== PoetryQuoteFSError.data.at(0)?.id &&
    pageFlipSubject$.next(randomQuote);

  return { randomQuote, flipPoetry, animatedStyle };
};
