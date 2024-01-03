import {auth, https} from "firebase-functions";
import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
import {initializeApp} from "firebase-admin/app";

initializeApp();

import {
  handWrittenTextRecognitionHandler,
} from "./handlers/handWrittenTextRecognition";
import {createUserDocumentTrigger} from "./triggers/onUser";
import {getAllPoemsHandler} from "./handlers/getAllPoems";
import { sendPoemNotification } from "./handlers/sendPoemNotification";

dotenv.config();

export const getAllPoems = https.onCall(getAllPoemsHandler);
export const sendNotification = https.onCall(sendPoemNotification);
export const send = https.onRequest((req, res) => {
  admin.messaging().send({
    notification: {
      title: "titulo interesante",
      body: "Super description",
    },
    data: {
      poem: JSON.stringify({
        id: "Super ID",
        summary: "Summary",
        authorPic: "https://lh3.googleusercontent.com/a/AAcHTtfnJbyGricdOuhjuPV5d-VINlFUojWWrEZA5zYQa2MXxA=s96-c",
        title: "Super title",
        text: "Super mega textooo",
      }),
    },
    topic: "Poems",
  });

  res.status(200).json({msg: "OK!"});
});

export const createUserDocument =
  auth.user().onCreate(createUserDocumentTrigger);

export const handWrittenTextRecognition =
  https.onCall(handWrittenTextRecognitionHandler);
