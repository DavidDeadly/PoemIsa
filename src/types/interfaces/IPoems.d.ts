interface IPoemsRepository {
  createPoem: (poem: PoemDB) => void;
  getPoemsByUser: (userID: string) => Promise<Poem[]>;
  getAllPoems: () => Promise<Poem[]>;
  getPoemById: (poemId) => Promise<Poem | null>;
  likePoem: (poemId: string, userId: string) => Promise<void>;
  unlikePoem: (poemId: string, userId: string) => Promise<void>;
}
