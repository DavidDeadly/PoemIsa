import {COLLECTIONS, db, poemsCollectionGroup} from "../models";
import {Poem} from "../models/converters/Poem";
import {User, userConverter} from "../models/converters/User";

interface AllPoemsData extends Poem {
  author: User
}

export const getAllPoemsHandler = async (): Promise<AllPoemsData[]> => {
  const poemsSnapShot = await poemsCollectionGroup.get();

  const poemsWithAuthors = await Promise.all(
    poemsSnapShot.docs.map(async (doc): Promise<AllPoemsData> => {
      const poem = doc.data();

      const authorDoc = await db.doc(`${COLLECTIONS.USERS}/${poem.authorUID}`)
        .withConverter(userConverter).get();

      return {
        ...poem,
        author: authorDoc.data()!,
      };
    })
  );

  return poemsWithAuthors;
};
