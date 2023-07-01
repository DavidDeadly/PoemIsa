import { useCallback, useEffect } from 'react';

import { PoemIsaStackParamList } from '@/types/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCurrentWrittingPoem } from '@/hooks/MMKV';
import { WritePoemHeaderTitle } from '@/components/WritePoemHeaderTitle';
import { SavePoemButton } from '@/components/SavePoemButton';
import { TextEditorRef } from '@/components/TextEditor';

type useWritePoemParameter = {
  editorRef: TextEditorRef;
};

export const useWritePoem = ({ editorRef }: useWritePoemParameter) => {
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();
  const { content, title, handleContentChange, handleTitleChange } =
    useCurrentWrittingPoem();

  const savePoem = useCallback(async () => {
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
    // contentToSave.ops.forEach(op => {
    //   console.log({ op });
    //   console.log('isANewLine: ', op.insert === '\n');
    //   console.log('content: ', op.insert);
    //   console.log('attributes : ', op.attributes);
    // });
    console.log('Saving poem');
  }, [editorRef]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <WritePoemHeaderTitle title={title} changeTitle={handleTitleChange} />
      ),
      headerRight: () => <SavePoemButton savePoem={savePoem} />
    });
  }, [navigation, title, savePoem, handleTitleChange]);

  return {
    content,
    handleContentChange
  };
};
