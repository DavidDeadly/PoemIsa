import React, { useCallback, useLayoutEffect } from 'react';

import { PoemIsaStackParamList } from '@/types/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCurrentWrittingPoem, useNotify } from '@/hooks';
import { WritePoemHeaderTitle } from '@/components/WritePoemHeaderTitle';
import { TextEditorRef } from '@/components/TextEditor';
import { COLORS } from '@/constants';
import { WritePoemHeaderRight } from '@/components/WritePoemHeaderRight';
import { useUser } from './useUser';
import { Author, PoemDataCreate } from '@/types/models/poem';
import { usePoemsStore } from './usePoemsStore';

type useWritePoemParameter = {
  editorRef: TextEditorRef;
};

export const useWritePoem = ({ editorRef }: useWritePoemParameter) => {
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();
  const notify = useNotify();
  const { content, title, persistContent, persistTitle, resetPoem } =
    useCurrentWrittingPoem();
  const { user } = useUser();

  const { createPoem } = usePoemsStore();

  const persistPoem = useCallback(
    (poemData: PoemDataCreate) => {
      const author: Author = {
        id: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL
      };

      return createPoem({
        title,
        ...poemData,
        author
      });
    },
    [title, user, createPoem]
  );

  const savePoem = useCallback(async () => {
    if (!editorRef.current) return;

    const [text, contentToSave, html] = await Promise.all([
      editorRef.current.getText(),
      editorRef.current.getContents(),
      editorRef.current.getHtml()
    ]);

    persistPoem({
      text,
      html,
      content: contentToSave.ops
    })
      .then(() => {
        resetPoem();
        notify.success('Poema posteado con exito!');
        navigation.goBack();
      })
      .catch(() => notify.error('Ha ocurrido un error posteando el poema!'));
  }, [editorRef, navigation, notify, resetPoem, persistPoem]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      statusBarTranslucent: false,
      statusBarColor: COLORS.MAIN.SECONDARY,
      headerTitle: () => (
        <WritePoemHeaderTitle
          initialTitle={title}
          persistTitle={persistTitle}
        />
      ),
      headerRight: () => <WritePoemHeaderRight savePoem={savePoem} />
    });
  }, [navigation, title, savePoem, persistTitle]);

  return {
    content,
    persistContent
  };
};
