import {
  mapDocToPoem,
  mapSnapshotToPoems,
  poemsCollection
} from '@/models/Poems';
import { IPoemsRepository } from '@/types/interfaces/IPoems';
import { Poem, PoemDB } from '@/types/models/poem';
import { firebase } from '@react-native-firebase/functions';

export class PoemRepository implements IPoemsRepository {
  static repository: PoemRepository;

  private constructor() {}

  static init() {
    this.repository = this.repository || new PoemRepository();

    return this.repository;
  }

  createPoem(poem: PoemDB) {
    return poemsCollection
      .add(poem)
      .then(doc => doc.get())
      .then(mapDocToPoem);
  }

  async getPoemsByUser(userID: string): Promise<Poem[]> {
    const authorIdPath = new firebase.firestore.FieldPath('author', 'id');

    const poemsSnapshot = await poemsCollection
      .where(authorIdPath, '==', userID)
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

  async getPoems({
    lastPoemId,
    limit = 10
  }: {
    lastPoemId?: string;
    limit?: number;
  }) {
    let poemsQuery = poemsCollection.orderBy('createdAt', 'desc').limit(limit);

    if (lastPoemId) {
      const lastPoem = await poemsCollection.doc(lastPoemId).get();
      poemsQuery = poemsQuery.startAfter(lastPoem);
    }

    const poemsSnapshot = await poemsQuery.get();
    const poems = mapSnapshotToPoems(poemsSnapshot);

    return poems;
  }

  likePoem(poemId: string, userId: string): Promise<void> {
    return poemsCollection.doc(poemId).update({
      usersLiked: firebase.firestore.FieldValue.arrayUnion(userId),
      likes: firebase.firestore.FieldValue.increment(1)
    });
  }

  unlikePoem(poemId: string, userId: string): Promise<void> {
    return poemsCollection.doc(poemId).update({
      usersLiked: firebase.firestore.FieldValue.arrayRemove(userId),
      likes: firebase.firestore.FieldValue.increment(-1)
    });
  }
}
