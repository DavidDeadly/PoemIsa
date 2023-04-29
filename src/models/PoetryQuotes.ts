import { PoetryQuotes, PoetryQuotesFS } from '@/types/models/poetryQuotes';
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
