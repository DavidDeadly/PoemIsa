import { TextEditor, TextEditorRef } from '@/components/TextEditor';
import { ForwardedRef } from 'react';

export const handleEditorRef = (
  reference: ForwardedRef<TextEditor>
): reference is TextEditorRef => {
  return typeof reference !== 'function' && reference !== null;
};
