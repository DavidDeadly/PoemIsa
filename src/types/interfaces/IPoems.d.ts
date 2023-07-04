interface IPoemsRepository {
  createPoem: (poem: PoemDB) => void;
  getPoemsByUser: (userID: string) => Promise<Poem[]>;
  getAllPoems: () => Promise<Poem[]>;
}
