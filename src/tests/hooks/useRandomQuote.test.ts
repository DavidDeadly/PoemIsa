import {
  renderHook,
  act as hookAct,
  waitFor
} from '@testing-library/react-native';

import { useRandomQuote } from '@/hooks';
import { PoetryQuotesRepository } from '@/repositories';
import { PoetryQuoteFSError } from '@/models';

describe('useRandomQuote', () => {
  const poetryQuotesRepository = PoetryQuotesRepository.init();
  const getAllSpy: jest.SpyInstance = jest
    .spyOn(poetryQuotesRepository, 'getAll')
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

  test("should return the error quote when the repository's getAll method fails", async () => {
    getAllSpy.mockRejectedValueOnce(
      new Error('Error getting all poetry quotes')
    );

    const { result } = renderHook(() => useRandomQuote());
    expect(result.current.randomQuote).toBeUndefined();

    await waitFor(() => result.current.randomQuote);

    expect(result.current.randomQuote).toBeDefined();
    expect(result.current.randomQuote).toEqual(PoetryQuoteFSError.data.at(0));
  });

  test("should return the error quote when the repository's getAll method returns an empty array", async () => {
    getAllSpy.mockResolvedValueOnce({
      count: 0,
      data: []
    });

    const { result } = renderHook(() => useRandomQuote());
    expect(result.current.randomQuote).toBeUndefined();

    await waitFor(() => result.current.randomQuote);

    expect(result.current.randomQuote).toBeDefined();
    expect(result.current.randomQuote).toEqual(PoetryQuoteFSError.data.at(0));
  });
});
