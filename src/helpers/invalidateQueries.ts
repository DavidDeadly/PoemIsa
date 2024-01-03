import { queryClient } from '@/App';

export async function invalidatePoemIdQuery(id?: string) {
  await queryClient.invalidateQueries({
    queryKey: ['poem', { id }]
  });
}

export async function invalidatePoemsQuery() {
  await queryClient.invalidateQueries({
    queryKey: ['poems']
  });
}
