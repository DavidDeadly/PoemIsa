import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { RouteProp, useRoute } from '@react-navigation/native';

import { getPoemById } from '@/services/Poems';
import { PoemIsaStackParamList } from '@/types/components';
import { usePoemsStore } from './usePoemsStore';

export const useDetailedPoem = () => {
  const { params } = useRoute<RouteProp<PoemIsaStackParamList, 'Detalle'>>();
  const [poem, fillPoem] = usePoemsStore(state => [
    state.poems.find(p => p.id === params?.poemId),
    state.fillPoem
  ]);

  const { isLoading, isError, data, error, isRefetching } = useQuery({
    queryKey: ['poem', { id: params?.poemId }],
    queryFn: () => getPoemById(params?.poemId)
  });

  useEffect(() => {
    data && poem && fillPoem(poem);
  }, [data, poem, fillPoem]);

  return {
    poem,
    isLoading,
    isError,
    error,
    isRefetching
  };
};
