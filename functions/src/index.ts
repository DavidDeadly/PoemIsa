import {auth, https} from "firebase-functions";
import * as dotenv from "dotenv";
import {initializeApp} from "firebase-admin/app";
initializeApp();

import {
  handWrittenTextRecognitionHandler,
} from "./handlers/handWrittenTextRecognition";
import {createUserDocumentTrigger} from "./triggers/onUser";
import {getAllPoemsHandler} from "./handlers/getAllPoems";

dotenv.config();

export const getAllPoems = https.onCall(getAllPoemsHandler);

export const createUserDocument =
  auth.user().onCreate(createUserDocumentTrigger);

export const handWrittenTextRecognition =
  https.onCall(handWrittenTextRecognitionHandler);

