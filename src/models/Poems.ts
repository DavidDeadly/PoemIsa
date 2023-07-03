import firestore from '@react-native-firebase/firestore';

export const poemsCollection = firestore().collection<PoemDB>('Poems');
