import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS } from '@/constants';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

const AppGradient = {
  start: { x: 0, y: 2 },
  end: { x: 2, y: 0 }
};

const defaultToolbarOptions = [
  [{ align: [false, 'center', 'right'] }],

  [{ font: [] }],

  [{ size: ['small', false, 'large'] }]
];

const selectionToolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],

  [{ color: [] }, { background: [] }],

  ['clean']
];

const customFormatHandler = {
  async clean(editor: QuillEditor) {
    const { index, length } = await editor.getSelection();
    editor.removeFormat(index, length);
  }
};

const toolbarsStyles = {
  toolbar: {
    root: (provided: object) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    })
  }
};

type CustomFormatHandler = typeof customFormatHandler;
type PosibleCustomFormats = keyof CustomFormatHandler;

export const WritePoem = () => {
  const editorRef = useRef<QuillEditor | null>(null);
  const toolbarRef = useRef<QuillToolbar | null>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);

  const toolbarOptions = isTextSelected
    ? selectionToolbarOptions
    : defaultToolbarOptions;

  const customHandler = (name: PosibleCustomFormats, value: any) => {
    const editor = editorRef.current;

    if (!editor) return;

    const formatHandler = customFormatHandler[name];

    if (!formatHandler) {
      console.log(`${name} clicked with value: ${value}`);
      return;
    }

    formatHandler(editor);
  };

  const handleSelection = (range: { index: number; length: number }) => {
    if (range.length === 0) {
      setIsTextSelected(false);
      return;
    }

    setIsTextSelected(true);
  };

  const handleTextChange = () =>
    setIsTextSelected(prevValue => prevValue && false);

  return (
    <LinearGradient
      accessibilityLabel="login"
      colors={Object.values(COLORS.MAIN)}
      style={styles.parentView}
      start={AppGradient.start}
      end={AppGradient.end}>
      <QuillEditor
        ref={editorRef}
        style={[styles.editor, styles.input]}
        onTextChange={handleTextChange}
        onSelectionChange={({ range }) => range && handleSelection(range)}
        container
        quill={{
          placeholder: 'Write something beautiful...',
          theme: 'snow',
          modules: {
            toolbar: false
          }
        }}
      />
      <QuillToolbar
        ref={toolbarRef}
        editor={editorRef}
        options={toolbarOptions}
        theme={{
          background: COLORS.MAIN.SECONDARY,
          color: COLORS.MAIN.PRIMARY,
          overlay: `${COLORS.MAIN.TERTIARY}50`,
          size: 35
        }}
        custom={{
          handler: name =>
            customFormatHandler.hasOwnProperty(name) && customHandler,
          actions: ['clean']
        }}
        styles={toolbarsStyles}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1
  },
  contentEditorView: {
    marginVertical: 10
  },
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
  },
  toolbar: {
    display: 'flex',
    alignContent: 'center',
    backgroundColor: COLORS.MAIN.SECONDARY
  }
});
