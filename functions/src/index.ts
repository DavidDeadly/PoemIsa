import {auth, https} from "firebase-functions";
import * as dotenv from "dotenv";
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

export const createUserDocument =
  auth.user().onCreate(createUserDocumentTrigger);

export const handWrittenTextRecognition =
  https.onCall(handWrittenTextRecognitionHandler);
