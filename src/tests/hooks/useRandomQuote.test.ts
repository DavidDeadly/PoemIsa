import {
  renderHook,
  act as hookAct,
  waitFor
} from '@testing-library/react-native';

import { useRandomQuote } from '@/hooks/useRandomQuote';
import { PoetryQuotesRepository } from '@/repositories/PoetryQuotesRepository';
import { PoetryQuoteFSError } from '@/models/PoetryQuotes';

const mockGetAllPoetryQuotes = jest
  .fn<Promise<PoetryQuotesData>, void[], PoetryQuotesRepository>()
  .mockResolvedValue({
    count: 2,
    data: [
      {
        id: '1',
        author: 'author 1',
        content: 'content 1'
      },
      {
        id: '2',
        author: 'author 2',
        content: 'content 2'
      }
    ]
  });

jest.mock('@/repositories/PoetryQuotesRepository', () => {
  return {
    PoetryQuotesRepository: {
      init: () => {
        return {
          getAll: mockGetAllPoetryQuotes
        };
      }
    }
  };
});

describe('useRandomQuote', () => {
  test('should be a function', () => {
    expect(useRandomQuote).toBeInstanceOf(Function);
  });

  test('should return a random quote', async () => {
    const { result } = renderHook(() => useRandomQuote());

    expect(result.current.randomQuote).toBeUndefined();
    await waitFor(() => result.current.randomQuote);
    expect(result.current.randomQuote).toBeDefined();
  });

  test('should return a random quote (not the same) when getAnotherQuote is called', async () => {
    const { result } = renderHook(() => useRandomQuote());

    expect(result.current.randomQuote).toBeUndefined();
    await waitFor(() => result.current.randomQuote);
    expect(result.current.randomQuote).toBeDefined();

    const currentQuote = result.current.randomQuote;
    hookAct(() => {
      result.current.getAnotherQuote(currentQuote);
    });

    expect(result.current.randomQuote).toBeDefined();
    expect(result.current.randomQuote).not.toEqual(currentQuote);
  });

  test("should return the erro quote when the repository's getAll method fails", async () => {
    mockGetAllPoetryQuotes.mockRejectedValue(
      new Error('Error getting all poetry quotes')
    );
    const { result } = renderHook(() => useRandomQuote());
    expect(result.current.randomQuote).toBeUndefined();
    await waitFor(() => result.current.randomQuote);

    expect(result.current.randomQuote).toBeDefined();
    expect(result.current.randomQuote).toEqual(PoetryQuoteFSError.data.at(0));
  });
});
