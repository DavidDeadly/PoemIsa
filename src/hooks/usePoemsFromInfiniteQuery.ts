import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { getAllPoems } from '@/services/Poems';
import { usePoemsStore } from '@/hooks/usePoemsStore';
import { useFillPoems } from './useFillPoems';

export const usePoemsFromInfiniteQuery = () => {
  const poems = usePoemsStore(state => state.poems);
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
    keepPreviousData: true,
    queryKey: ['poems'],
    queryFn: ({ pageParam }) => getAllPoems(pageParam),
    getNextPageParam: lastPage => lastPage.at(-1)?.id
  });

  useEffect(() => {
    const refreshing = isRefetching && !isFetchingNextPage;

    setIsRefreshing(refreshing);
  }, [isRefetching, isFetchingNextPage]);

  useFillPoems(isRefreshing, data?.pages);

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
