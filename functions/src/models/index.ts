import {getFirestore} from "firebase-admin/firestore";
import {User, userConverter} from "./converters/User";
import {Poem, poemConverter} from "./converters/Poem";

export const db = getFirestore();

export const enum COLLECTIONS {
  USERS = "Users",
  POEMS = "Poems"
}

export const userCollection =
  db.collection(COLLECTIONS.USERS).withConverter<User>(userConverter);

export const poemsCollectionGroup =
  db.collection(COLLECTIONS.POEMS).withConverter<Poem>(poemConverter);
