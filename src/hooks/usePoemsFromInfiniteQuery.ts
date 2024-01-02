import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { getAllPoems } from '@/services/Poems';
import { usePoemsStore } from '@/hooks/usePoemsStore';

export const usePoemsFromInfiniteQuery = (title: string) => {
  const [poems, fillPoems] = usePoemsStore(state => [
    state.poems,
    state.fillPoems
  ]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    error,
    isRefetching
  } = useInfiniteQuery({
    queryKey: ['poems'],
    queryFn: ({ pageParam }) => getAllPoems(pageParam, title),
    getNextPageParam: lastPage => lastPage.at(-1)?.id
  });

  useEffect(() => {
    const refreshing = isRefetching && !isFetchingNextPage;
    setIsRefreshing(refreshing);
    refreshing && fillPoems([]);
  }, [isRefetching, isFetchingNextPage, fillPoems]);

  useEffect(() => {
    data?.pages && fillPoems(data.pages.flat(1));
  }, [data, fillPoems]);

  return {
    isLoading,
    isError,
    poems,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    error,
    isRefreshing
  };
};
