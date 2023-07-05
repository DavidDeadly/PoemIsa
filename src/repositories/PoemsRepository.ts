import {
  mapDocToPoem,
  mapSnapshotToPoems,
  poemsCollection
} from '@/models/Poems';
import { firebase } from '@react-native-firebase/functions';

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

  async getPoemsByUser(userID: string): Promise<Poem[]> {
    const authoIdPath = new firebase.firestore.FieldPath('author', 'id');

    const poemsSnapshot = await poemsCollection
      .where(authoIdPath, '==', userID)
      .orderBy('createdAt', 'desc')
      .get();

    const poems = mapSnapshotToPoems(poemsSnapshot);

    return poems;
  }

  async getPoemById(poemId: any): Promise<Poem | null> {
    const poemSnapshot = await poemsCollection.doc(poemId).get();

    const poem = mapDocToPoem(poemSnapshot);

    return poem;
  }

  async getAllPoems() {
    const poemsSnapshot = await poemsCollection
      .orderBy('createdAt', 'desc')
      .get();
    const poems = mapSnapshotToPoems(poemsSnapshot);

    return poems;
  }

  likePoem(poemId: string, userId: string): Promise<void> {
    return poemsCollection.doc(poemId).update({
      likes: firebase.firestore.FieldValue.arrayUnion(userId)
    });
  }

  unlikePoem(poemId: string, userId: string): Promise<void> {
    return poemsCollection.doc(poemId).update({
      likes: firebase.firestore.FieldValue.arrayRemove(userId)
    });
  }
}
