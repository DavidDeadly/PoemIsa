import { MutableRefObject, forwardRef, useCallback } from 'react';
import QuillEditor from 'react-native-cn-quill';
import debounce from 'just-debounce-it';
import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import { handleEditorRef } from '@/helpers/handleEditorRef';

export type TextEditor = QuillEditor;
export type TextEditorRef = MutableRefObject<TextEditor | null>;

type TextEditorProps = {
  placeholder: string;
  content: any[];
  handleContentChange: (newContent: string) => void;
  changeIsTextSelected: (isSelected: boolean) => void;
};

export const TextEditor = forwardRef<TextEditor, TextEditorProps>(
  (
    { placeholder, content, changeIsTextSelected, handleContentChange },
    ref
  ) => {
    const handleSelection = (
      range: { index: number; length: number } | null
    ) => {
      if (!range) return;
      if (range.length === 0) {
        changeIsTextSelected(false);
        return;
      }

      changeIsTextSelected(true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onContentChange = useCallback(
      debounce(async (editor: TextEditor | null) => {
        if (!editor) return;
        const newContent = await editor.getContents();

        handleContentChange(newContent.ops);
      }, 500),
      []
    );

    return (
      <QuillEditor
        webview={{
          androidLayerType: 'hardware',
          onLoad: () =>
            handleEditorRef(ref) && ref.current?.setContents(content)
        }}
        onTextChange={() =>
          handleEditorRef(ref) && onContentChange(ref.current)
        }
        ref={ref}
        style={[editor, input]}
        onSelectionChange={({ range }) => handleSelection(range)}
        container
        quill={{
          placeholder,
          theme: 'snow',
          modules: {
            toolbar: false
          }
        }}
      />
    );
  }
);

const { editor, input } = StyleSheet.create({
  editor: {
    flex: 1,
    padding: 0
  },
  input: {
    margin: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.MAIN.PRIMARY,
    backgroundColor: `${COLORS.MAIN.PRIMARY}80`
  }
});
