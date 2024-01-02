import { Poem, PoemDB } from '@/types/models/poem';
import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore/lib';

export const poemsCollection = firestore().collection<PoemDB>('Poems');

export const mapSnapshotToPoems = (
  poemsSnapshot: FirebaseFirestoreTypes.QuerySnapshot<PoemDB>
): Poem[] => {
  return poemsSnapshot.docs.map(doc => {
    const poetryQuote = doc.data();

    return {
      id: doc.id,
      ...poetryQuote,
      createdAt: poetryQuote.createdAt.toDate()
    };
  });
};

export const mapDocToPoem = (
  poem: FirebaseFirestoreTypes.DocumentSnapshot<PoemDB>
): Poem | null => {
  const poetryQuote = poem.data();

  if (!poetryQuote) return null;

  return {
    id: poem.id,
    ...poetryQuote,
    createdAt: poetryQuote.createdAt.toDate()
  };
};

export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const filterByTitle = (poems: Poem[], title?: string) => {
  if (!title) return poems;

  const regEx = new RegExp(`.*${title}.*`);
  return poems.filter(poem => {
    const titleNoAccents = removeAccents(poem.title);

    return titleNoAccents.match(regEx);
  });
};
