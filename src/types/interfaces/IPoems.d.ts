interface AllPoemsData extends Poem {
  author: DBUser;
}

interface IPoemsRepository {
  createPoem: (poem: PoemDB) => void;
  getAllPoems: () => Promise<AllPoemsData[]>;
}
