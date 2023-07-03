import React, { useCallback, useLayoutEffect } from 'react';

import { PoemIsaStackParamList } from '@/types/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCurrentWrittingPoem } from '@/hooks/MMKV';
import { WritePoemHeaderTitle } from '@/components/WritePoemHeaderTitle';
import { TextEditorRef } from '@/components/TextEditor';
import { COLORS } from '@/constants';
import { WritePoemHeaderRight } from '@/components/WritePoemHeaderRight';
import { useUser } from './useUser';
import { Alert } from 'react-native';
import { createPoemDB } from '@/services/Poems';

type useWritePoemParameter = {
  editorRef: TextEditorRef;
};

export const useWritePoem = ({ editorRef }: useWritePoemParameter) => {
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();
  const { content, title, handleContentChange, handleTitleChange } =
    useCurrentWrittingPoem();
  const { user } = useUser();

  const resetPoem = useCallback(() => {
    handleTitleChange('');
    handleContentChange([]);
  }, [handleTitleChange, handleContentChange]);

  const createPoem = useCallback(
    async (poemData: PoemDataCreate) => {
      createPoemDB({
        title,
        ...poemData,
        authorUID: user?.uid ?? 'Anonymous'
      });

      Alert.alert('SAVED!!!');
      navigation.goBack();
      resetPoem();
    },
    [resetPoem, navigation, title, user]
  );

  const savePoem = useCallback(async () => {
    if (!editorRef.current) return;

    const [text, contentToSave, html] = await Promise.all([
      editorRef.current.getText(),
      editorRef.current.getContents(),
      editorRef.current.getHtml()
    ]);

    createPoem({
      text,
      html,
      content: contentToSave.ops
    }).catch(err => console.error('Error saving: ', err.message));
  }, [editorRef, createPoem]);

  useLayoutEffect(() => {
    navigation.setOptions({
      statusBarTranslucent: false,
      statusBarAnimation: 'slide',
      statusBarColor: COLORS.MAIN.SECONDARY,
      statusBarStyle: 'dark',
      headerTitle: () => (
        <WritePoemHeaderTitle title={title} changeTitle={handleTitleChange} />
      ),
      headerRight: () => <WritePoemHeaderRight savePoem={savePoem} />
    });
  }, [navigation, title, savePoem, handleTitleChange]);

  return {
    content,
    handleContentChange
  };
};
