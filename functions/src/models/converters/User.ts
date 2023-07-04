import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export interface User {
  displayName?: string,
  email?: string,
  emailVerified: boolean,
  aboutMe: string,
  followers: number,
  followed: number,
  photoURL?: string,
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore({
    displayName,
    email,
    emailVerified,
    followers,
    followed,
    photoURL,
    aboutMe,
  }: User): DocumentData {
    return {
      displayName,
      email,
      emailVerified,
      followers,
      followed,
      photoURL,
      aboutMe,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): User {
    const data = snapshot.data();
    return {
      displayName: data.displayName,
      email: data.email,
      emailVerified: data.emailVerified,
      followers: data.followers,
      followed: data.followed,
      photoURL: data.photoURL,
      aboutMe: data.aboutMe,
    };
  },
};
