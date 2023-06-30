import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import debounce from 'just-debounce-it';

import { COLORS } from '@/constants';
import { useCurrentWrittingPoem } from '@/hooks/MMKV';
import { NavigationProp } from '@react-navigation/native';
import { PoemIsaStackParamList } from '@/types/components';
import { WritePoemHeaderTitle } from '@/components/WritePoemHeaderTitle';

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

const customFormatHandler = new Map<
  string,
  (editor: QuillEditor, value?: any) => void
>([
  [
    'clean',
    async (editor: QuillEditor) => {
      const { index, length } = await editor.getSelection();
      editor.removeFormat(index, length);
    }
  ],
  [
    'align',
    async (editor: QuillEditor, value: string) => {
      const { length } = await editor.getSelection();

      const nothingIsSelected = length === 0;
      if (nothingIsSelected) {
        const textLength = await editor.getLength();
        await editor.formatText(0, textLength, {
          align: value
        });

        return;
      }

      editor.format('align', value);
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

const SavePoemButton = ({ savePoem }) => (
  <TouchableOpacity
    onPress={savePoem}
    style={{
      padding: 8,
      borderRadius: 10,
      backgroundColor: `${COLORS.MAIN.PRIMARY}50`
    }}>
    <Text
      style={{
        color: COLORS.MAIN.PRIMARY,
        fontWeight: '900',
        fontSize: 18
      }}>
      Continuar
    </Text>
  </TouchableOpacity>
);

type WritePoemProps = {
  navigation: NavigationProp<PoemIsaStackParamList>;
};

export const WritePoem: FC<WritePoemProps> = ({ navigation }) => {
  const editorRef = useRef<QuillEditor | null>(null);
  const toolbarRef = useRef<QuillToolbar | null>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const { content, title, handleContentChange, handleTitleChange } =
    useCurrentWrittingPoem();

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: () => (
        <WritePoemHeaderTitle title={title} changeTitle={handleTitleChange} />
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <SavePoemButton savePoem={handlePoemSave} />
    });
  }, [handleTitleChange, navigation, title]);

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

    formatHandler(editor, value);
  };

  const handleSelection = (range: { index: number; length: number }) => {
    if (range.length === 0) {
      setIsTextSelected(false);
      return;
    }

    setIsTextSelected(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onContentChange = useCallback(
    debounce(async (editor: QuillEditor) => {
      const newContent = await editor.getContents();

      handleContentChange(newContent.ops);
    }, 500),
    []
  );

  const handlePoemSave = async () => {
    if (!editorRef.current) return;

    const startGettingPoemData = performance.now();

    const [text, contentToSave, html] = await Promise.all([
      editorRef.current.getText(),
      editorRef.current.getContents(),
      editorRef.current.getHtml()
    ]);

    const endGettingPoemData = performance.now();

    console.log(
      `Getting poem data took ${
        endGettingPoemData - startGettingPoemData
      } milliseconds.`
    );

    console.log({ text, content: contentToSave.ops, html });
    console.log('Saving poem');
  };

  return (
    <LinearGradient
      accessibilityLabel="login"
      colors={Object.values(COLORS.MAIN)}
      style={styles.parentView}
      start={AppGradient.start}
      end={AppGradient.end}>
      <QuillEditor
        webview={{
          androidLayerType: 'hardware',
          onLoad: () => editorRef.current?.setContents(content)
        }}
        onTextChange={() =>
          editorRef.current && onContentChange(editorRef.current)
        }
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
          actions: ['clean', 'align']
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
