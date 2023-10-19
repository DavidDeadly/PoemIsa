import { Poem } from '@/models/poem';

interface IPoemsRepository {
  createPoem: (poem: PoemDB) => Poem;
  getPoemsByUser: (userID: string) => Promise<Poem[]>;
  getAllPoems: () => Promise<Poem[]>;
  getPoems: ({
    lastPoemId,
    limit = 10
  }: {
    lastPoemId: string;
    limit: number;
  }) => Promise<Poem[]>;
  getPoemById: (poemId) => Promise<Poem | null>;
  likePoem: (poemId: string, userId: string) => Promise<void>;
  unlikePoem: (poemId: string, userId: string) => Promise<void>;
}
