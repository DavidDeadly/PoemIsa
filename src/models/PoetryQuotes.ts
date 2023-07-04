import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore/lib';

export const PoetryQoutesCollection =
  firestore().collection<PoetryQuotes>('PoetryQuotes');

export const mapSnapshotToPoetryQuote = (
  poetryQuotesSnapshot: FirebaseFirestoreTypes.QuerySnapshot<PoetryQuotes>
): PoetryQuotesFS[] => {
  return poetryQuotesSnapshot.docs.map(poetryQuoteSnapshot => {
    const poetryQuote = poetryQuoteSnapshot.data();
    return {
      id: poetryQuoteSnapshot.id,
      ...poetryQuote
    };
  });
};

export const PoetryQuoteFSError: PoetryQuotesData = {
  count: 0,
  data: [
    {
      id: '0',
      content: 'No quotes found',
      author: 'Error'
    }
  ]
};
