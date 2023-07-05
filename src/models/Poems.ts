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
      ...poetryQuote
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
    ...poetryQuote
  };
};
