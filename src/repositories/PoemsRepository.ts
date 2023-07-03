import functions from '@react-native-firebase/functions';

import { poemsCollection } from '@/models/Poems';

export class PoemRepository implements IPoemsRepository {
  static repository: PoemRepository;

  private constructor() {}

  static init() {
    this.repository = this.repository || new PoemRepository();

    return this.repository;
  }

  createPoem(poem: PoemDB) {
    return poemsCollection.add(poem);
  }

  async getAllPoems() {
    const getAllPoemsFunction = functions().httpsCallable('getAllPoems');

    const res = await getAllPoemsFunction();

    return res.data as AllPoemsData[];
  }
}
