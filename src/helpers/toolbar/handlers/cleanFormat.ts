import { TextEditor } from '@/components/TextEditor';

export async function cleanFormat(editor: TextEditor) {
  const { index, length } = await editor.getSelection();
  editor.removeFormat(index, length);
}
