import React, { useCallback, useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

import { PoemIsaStackParamList } from '@/types/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCurrentWrittingPoem } from '@/hooks/MMKV';
import { WritePoemHeaderTitle } from '@/components/WritePoemHeaderTitle';
import { TextEditorRef } from '@/components/TextEditor';
import { COLORS } from '@/constants';
import { WritePoemHeaderRight } from '@/components/WritePoemHeaderRight';
import { useUser } from './useUser';
import { Alert } from 'react-native';

type useWritePoemParameter = {
  editorRef: TextEditorRef;
};

interface Poem {
  title: string;
  content: never[];
  html: string;
  text: string;
  likes: 0;
  authorUID: string;
}

export const poemsCollection = firestore().collection<Poem>('Poems');

export const useWritePoem = ({ editorRef }: useWritePoemParameter) => {
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();
  const { content, title, handleContentChange, handleTitleChange } =
    useCurrentWrittingPoem();
  const { user } = useUser();

  const savePoemOnCollection = useCallback(
    (text: string, contentToSave: never[], html: string) => {
      poemsCollection
        .add({
          title,
          html,
          text,
          content: contentToSave,
          likes: 0,
          authorUID: user?.uid ?? 'Anonymous'
        })
        .then(() => {
          Alert.alert('SAVED!!!');
          handleTitleChange('');
          handleContentChange([]);
          navigation.goBack();
        })
        .catch(err => console.error('Error saving: ', err.message));
    },
    [handleTitleChange, handleContentChange, navigation, title, user]
  );

  const savePoem = useCallback(async () => {
    if (!editorRef.current) return;

    const [text, contentToSave, html] = await Promise.all([
      editorRef.current.getText(),
      editorRef.current.getContents(),
      editorRef.current.getHtml()
    ]);

    savePoemOnCollection(text, contentToSave.ops, html);
  }, [editorRef, savePoemOnCollection]);

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
