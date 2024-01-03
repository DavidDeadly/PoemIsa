import { useEffect, useCallback } from 'react';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

import { useDetailedPoem } from '@/hooks/useDetailedPoem';

const storage = new MMKVLoader().initialize();

export const useCurrentWritingPoem = () => {
  const { poem, isLoading, isError, error } = useDetailedPoem();

  const [title, setTitle] = useMMKVStorage(
    'PoemTitle',
    storage,
    poem?.title ?? ''
  );
  const [content, setContent] = useMMKVStorage(
    'PoemContent',
    storage,
    poem?.content ?? []
  );

  const persistTitle = (newTitle: string) => setTitle(newTitle);
  const persistContent = (newContent: never[]) => setContent(newContent);
  const resetPoem = useCallback(() => {
    setTitle('');
    setContent([]);
  }, [setTitle, setContent]);

  useEffect(() => {
    if (poem) {
      setContent(poem.content);
      setTitle(poem.title);
    }

    return () => {
      poem && resetPoem();
    };
  }, [poem, resetPoem, setTitle, setContent]);

  return {
    title,
    content,
    persistTitle,
    persistContent,
    resetPoem
  };
};
