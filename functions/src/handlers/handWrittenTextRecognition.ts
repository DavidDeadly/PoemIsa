import vision from "@google-cloud/vision";
import * as functions from "firebase-functions";
import {CallableContext} from "firebase-functions/lib/common/providers/https";

const bucketURI = process.env.IMAGES_BUCKET;

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.SERVICE_ACCOUNT_KEY_FILENAME,
});


const recognizeHandWrittenText = async (filePath: string) => {
  const [result] = await client.documentTextDetection(filePath);

  return result.fullTextAnnotation?.text;
};

export const handWrittenTextRecognitionHandler =
  async (bucketFilePath: string, _context: CallableContext) => {
    try {
      const fullImagePath = `${bucketURI}/${bucketFilePath}`;
      const text = await recognizeHandWrittenText(fullImagePath);

      return {
        text,
      };
    } catch (e: any) {
      throw new functions.https.HttpsError("internal", e.message, e.details);
    }
  };
