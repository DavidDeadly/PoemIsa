import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";
import * as dotenv from "dotenv";

dotenv.config();

const bucketURI = process.env.IMAGES_BUCKET;

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.SERVICE_ACCOUNT_KEY_FILENAME,
});

export type HandWrittenTextResponse = {
  data: {
    text: string;
  };
};

export const handWrittenTextRecognition = functions.https.onCall(
  async (bucketFilePath: string, _context) => {
    try {
      const fullImagePath = `${bucketURI}/${bucketFilePath}`;

      const text = await recognizeHandWrittenText(fullImagePath);

      return {
        text,
      };
    } catch (e: any) {
      throw new functions.https.HttpsError("internal", e.message, e.details);
    }
  });

const recognizeHandWrittenText = async (filePath: string) => {
  const [result] = await client.documentTextDetection(filePath);

  return result.fullTextAnnotation?.text;
};
