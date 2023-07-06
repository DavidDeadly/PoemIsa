import { getAllPoems } from '@/services/Poems';
import { Poem } from '@/types/models/poem';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

export const usePoemsFromInfiniteQuery = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
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
    queryKey: 'poems',
    queryFn: ({ pageParam }) => getAllPoems(pageParam),
    getNextPageParam: lastPage => lastPage.at(-1)?.id
  });

  useEffect(() => {
    const refreshing = isRefetching && !isFetchingNextPage;
    setIsRefreshing(refreshing);
    refreshing && setPoems([]);
  }, [isRefetching, isFetchingNextPage]);

  useEffect(() => {
    data?.pages && setPoems(data.pages.flat(1));
  }, [data]);

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
