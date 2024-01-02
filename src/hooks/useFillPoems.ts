import { useEffect } from 'react';

import { Poem } from '@/types/models/poem';
import { usePoemsStore } from './usePoemsStore';

export const useFillPoems = (isFetching: boolean, data?: Poem[] | Poem[][]) => {
  const fillPoems = usePoemsStore(state => state.fillPoems);

  useEffect(() => {
    isFetching && fillPoems([]);
  }, [isFetching, fillPoems]);

  useEffect(() => {
    data && fillPoems(data.flat?.(1));
  }, [data, fillPoems]);
};
