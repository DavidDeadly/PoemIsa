import {
  renderHook,
  act as hookAct,
  waitFor
} from '@testing-library/react-native';

import { useFlipQuoteEffects } from '@/hooks/useFlipQuoteEffects';
import { PoetryQuotesFS } from '@/types/models/poetryQuotes';
import { Subject } from 'rxjs';
import { Player } from '@react-native-community/audio-toolkit';

let mockRandomQuote: PoetryQuotesFS | undefined;
const mockGetAnotherQuote = jest.fn();
jest.mock('@/hooks/useRandomQuote', () => {
  return {
    useRandomQuote: jest.fn(() => {
      return {
        randomQuote: mockRandomQuote,
        getAnotherQuote: mockGetAnotherQuote
      };
    })
  };
});

jest.mock('@react-native-community/audio-toolkit', () => {
  return {
    Player: jest.fn(() => {
      return {
        prepare: jest.fn(callback => {
          callback();
        }),
        play: jest.fn()
      };
    })
  };
});

let mockSound$ = new Subject();
jest.mock('@/helpers/getSoundPrepared', () => {
  return {
    getSoundPrepared: jest.fn(() => mockSound$)
  };
});

describe('useFlipQuoteEffects', () => {
  let sound: Player;
  beforeEach(() => {
    sound = new Player('sound');
    mockSound$ = new Subject();
  });

  afterEach(() => {
    mockRandomQuote = undefined;
    mockGetAnotherQuote.mockClear();
  });

  test('should be a function', () => {
    expect(useFlipQuoteEffects).toBeInstanceOf(Function);
  });

  test('should return an object with the expected properties', () => {
    const { result } = renderHook(() =>
      useFlipQuoteEffects({ delayEffect: 0, delayClick: 0 })
    );

    expect(result.current).toHaveProperty('randomQuote');
    expect(result.current).toHaveProperty('flipPoetry');
    expect(result.current).toHaveProperty('animatedStyle');
  });

  test("should return the random quote when it's defined", () => {
    const { result, rerender } = renderHook(() =>
      useFlipQuoteEffects({ delayEffect: 0, delayClick: 0 })
    );

    expect(result.current.randomQuote).toBeUndefined();

    mockRandomQuote = {
      author: 'author 1',
      content: 'content 1',
      id: '1'
    };

    rerender(1);

    expect(result.current.randomQuote).toEqual(mockRandomQuote);
  });

  test("should return animated style with 0deg rotation when it's not flipping", () => {
    const { result } = renderHook(() =>
      useFlipQuoteEffects({ delayEffect: 0, delayClick: 0 })
    );

    expect(result.current.animatedStyle).toEqual({
      transform: [{ rotateY: '0deg' }]
    });
  });

  test('should subscribe to mockSound$ when flipPoetry is call', () => {
    const spySoundSubscription = jest.spyOn(mockSound$, 'subscribe');

    const { result } = renderHook(() =>
      useFlipQuoteEffects({ delayEffect: 500 })
    );

    result.current.flipPoetry();

    expect(spySoundSubscription).toHaveBeenCalled();
    expect(spySoundSubscription).toHaveBeenCalledTimes(1);

    spySoundSubscription.mockClear();
  });

  test('should play the sound when the mockSound$ emits its value', () => {
    const spyPlay = jest.spyOn(sound, 'play');

    const { result } = renderHook(() =>
      useFlipQuoteEffects({ delayEffect: 500 })
    );

    result.current.flipPoetry();

    mockSound$.next(sound);

    expect(spyPlay).toHaveBeenCalled();
    expect(spyPlay).toHaveBeenCalledTimes(1);
  });

  test('should not play the sound when the mockSound$ emits an error', () => {
    const spyPlay = jest.spyOn(sound, 'play');

    const { result } = renderHook(() =>
      useFlipQuoteEffects({ delayEffect: 500 })
    );

    result.current.flipPoetry();

    mockSound$.error(sound);

    expect(spyPlay).not.toHaveBeenCalled();
  });

  test('should call getAnotherQuote when the mockSound$ emits its value', async () => {
    const { result } = renderHook(() => useFlipQuoteEffects({}));

    hookAct(() => {
      result.current.flipPoetry();
    });

    await waitFor(() => expect(mockGetAnotherQuote).toHaveBeenCalled());
    expect(mockGetAnotherQuote).toHaveBeenCalledTimes(1);
  });
});
