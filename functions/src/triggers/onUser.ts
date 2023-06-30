import {UserRecord} from "firebase-admin/auth";
import {userCollection} from "../models";

export const createUserDocumentTrigger = ({
  displayName,
  email,
  photoURL,
  emailVerified,
  uid,
}: UserRecord) =>
  userCollection.doc(uid).set({
    displayName,
    email,
    photoURL,
    emailVerified,
    followed: 0,
    followers: 0,
  });
