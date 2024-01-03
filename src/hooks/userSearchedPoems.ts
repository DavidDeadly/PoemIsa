import { useQuery } from 'react-query';

import { usePoemsStore } from '@/hooks/usePoemsStore';
import { getAllPoems } from '@/services/Poems';

import { useFillPoems } from './useFillPoems';

export const useSearchedPoems = (title: string) => {
  const poems = usePoemsStore(state => state.poems);
  const { data, isError, error, refetch, isLoading, isRefetching } = useQuery({
    keepPreviousData: true,
    queryKey: ['poems'],
    queryFn: () => getAllPoems(undefined, title)
  });

  useFillPoems(isRefetching, data);

  return {
    isLoading,
    isError,
    poems,
    refetch,
    error,
    isRefetching
  };
};
