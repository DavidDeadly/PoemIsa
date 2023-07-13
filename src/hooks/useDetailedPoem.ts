import { RouteProp, useRoute } from '@react-navigation/native';
import { usePoemsStore } from './usePoemsStore';
import { useQuery } from 'react-query';
import { getPoemById } from '@/services/Poems';
import { useEffect } from 'react';
import { PoemIsaStackParamList } from '@/types/components';

export const useDetailedPoem = () => {
  const { params } = useRoute<RouteProp<PoemIsaStackParamList>>();
  const [poem, fillPoem] = usePoemsStore(state => [
    state.poems.find(p => p.id === params?.poemId),
    state.fillPoem
  ]);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: `poem-${params?.poemId}`,
    queryFn: () => getPoemById(params?.poemId)
  });

  useEffect(() => {
    data && poem && fillPoem(poem);
  }, [data, poem, fillPoem]);

  return {
    poem,
    isLoading,
    isError,
    error
  };
};
