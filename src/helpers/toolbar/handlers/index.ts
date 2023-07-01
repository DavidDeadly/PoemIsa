import { TextEditor } from '@/components/TextEditor';
import { cleanFormat } from '@/helpers/toolbar/handlers/cleanFormat';
import { alignTextEditor } from '@/helpers/toolbar/handlers/alignTextEditor';

export const customFormatHandler = new Map<
  string,
  (editor: TextEditor, value?: any) => void
>([
  ['clean', cleanFormat],
  ['align', alignTextEditor]
]);

export const customFormats = Array.from(customFormatHandler.keys());
