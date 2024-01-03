import React, { useCallback, useLayoutEffect } from 'react';
import functions from '@react-native-firebase/functions';

import { PoemIsaStackParamList } from '@/types/components';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { useCurrentWritingPoem, useNotify } from '@/hooks';
import { WritePoemHeaderTitle } from '@/components/WritePoemHeaderTitle';
import { TextEditorRef } from '@/components/TextEditor';
import { COLORS } from '@/constants';
import { WritePoemHeaderRight } from '@/components/WritePoemHeaderRight';
import { useUser } from './useUser';
import { Author, PoemDataCreate } from '@/types/models/poem';
import { usePoemsStore } from './usePoemsStore';
import { Alert } from 'react-native';
import {
  invalidatePoemIdQuery,
  invalidatePoemsQuery
} from '@/helpers/invalidateQueries';
import { PoemIsaHomeTabsParamList } from '@/types/components/navigators/PoemIsaStack';

const DEFAULT_TITLE = 'Sin título';
type useWritePoemParameter = {
  editorRef: TextEditorRef;
};

export const useWritePoem = ({ editorRef }: useWritePoemParameter) => {
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();
  const navMain = useNavigation<NavigationProp<PoemIsaHomeTabsParamList>>();
  const { params } = useRoute<RouteProp<PoemIsaStackParamList, 'Escribir'>>();
  const notify = useNotify();
  const { content, title, persistContent, persistTitle, resetPoem } =
    useCurrentWritingPoem();
  const { user } = useUser();

  const { createPoem, updatePoem } = usePoemsStore();

  const persistPoem = useCallback(
    (poemData: PoemDataCreate) => {
      const author: Author = {
        id: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL
      };

      const isEditing = Boolean(params?.poemId);

      return isEditing
        ? updatePoem(params?.poemId ?? '', {
            ...poemData,
            author
          })
        : createPoem({
            ...poemData,
            author
          });
    },
    [user, params?.poemId, createPoem, updatePoem]
  );

  const savePoem = useCallback(
    async (poemTitle: string) => {
      if (!editorRef.current) return;

      const [text, contentToSave, html] = await Promise.all([
        editorRef.current.getText(),
        editorRef.current.getContents(),
        editorRef.current.getHtml()
      ]);

      persistPoem({
        title: poemTitle,
        text,
        html,
        content: contentToSave.ops
      })
        .then(async id => {
          if (!id) throw new Error('Poem not persisted');

          resetPoem();

          const isEditing = Boolean(params?.poemId);

          const message = isEditing
            ? 'Poema editado con éxito!'
            : 'Poema posteado con éxito!';

          notify.success(message);

          functions()
            .httpsCallable('sendNotification')({
              opts: { isEditing },
              poem: {
                id,
                authorPic: user?.photoURL,
                title: poemTitle,
                text
              }
            })
            .then(() => {
              console.log('Notification send successfully!');
            })
            .catch(err => {
              console.error(
                'There was an error notifying the poem creation!: ',
                err
              );
            });
          isEditing ? navMain.navigate('Perfil') : navigation.goBack();
        })
        .catch(() => {
          const isEditing = Boolean(params?.poemId);

          if (!isEditing) resetPoem();

          const message = isEditing
            ? 'Ha ocurrido un error editando el poema!'
            : 'Ha ocurrido un error posteando el poema!';
          notify.error(message);
        })
        .finally(async () => {
          if (params?.poemId) {
            await invalidatePoemIdQuery(params.poemId);
          }

          await invalidatePoemsQuery();
        });
    },
    [
      editorRef,
      navigation,
      notify,
      navMain,
      params?.poemId,
      resetPoem,
      persistPoem
    ]
  );

  const onSavePoem = useCallback(async () => {
    if (title) return savePoem(title);

    return Alert.alert(
      'Obra sin título',
      'No has titulado tu hermoso poema, ¿deseas continuar sin título?',
      [
        {
          text: 'Sí',
          onPress: () => {
            persistTitle(DEFAULT_TITLE);
            savePoem(DEFAULT_TITLE);
          }
        }
      ],
      {
        cancelable: true
      }
    );
  }, [title, persistTitle, savePoem]);

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
      headerRight: () => <WritePoemHeaderRight savePoem={onSavePoem} />
    });
  }, [navigation, title, onSavePoem, persistTitle]);

  return {
    content,
    persistContent
  };
};
