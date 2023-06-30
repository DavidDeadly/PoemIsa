import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export interface Poem {
  title: string,
  content: string,
  html: string,
  text: 0,
  likes: 0,
  authorUID: string
}

export const poemConverter: FirestoreDataConverter<Poem> = {
  toFirestore(poem: Poem): DocumentData {
    return {
      title: poem.title,
      authorUID: poem.authorUID,
      content: poem.content,
      html: poem.html,
      text: poem.text,
      likes: poem.likes,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): Poem {
    const data = snapshot.data();
    return {
      title: data.title,
      authorUID: data.authorUID,
      content: data.content,
      html: data.html,
      text: data.text,
      likes: data.likes,
    };
  },
};

