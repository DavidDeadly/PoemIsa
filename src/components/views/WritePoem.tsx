import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS } from '@/constants';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { timer } from 'rxjs';

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

const customFormatHandler = new Map([
  [
    'clean',
    async (editor: QuillEditor) => {
      const { index, length } = await editor.getSelection();
      editor.removeFormat(index, length);
    }
  ]
]);

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

export const WritePoem = () => {
  const editorRef = useRef<QuillEditor | null>(null);
  const toolbarRef = useRef<QuillToolbar | null>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);

  const toolbarOptions = isTextSelected
    ? selectionToolbarOptions
    : defaultToolbarOptions;

  const customHandler = (name: string, value: any) => {
    const editor = editorRef.current;

    if (!editor) return;

    const formatHandler = customFormatHandler.get(name);

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

  useEffect(() => {
    const focusEditorSub = timer(500).subscribe(() =>
      editorRef.current?.focus()
    );

    return () => focusEditorSub.unsubscribe();
  }, []);

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
          overlay: `${COLORS.MAIN.PRIMARY}30`,
          size: 35
        }}
        custom={{
          handler: customHandler,
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
