import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export const useCurrentWrittingPoem = () => {
  const [title, setTitle] = useMMKVStorage('PoemTitle', storage, '');
  const [content, setContent] = useMMKVStorage('PoemContent', storage, []);

  const persistTitle = (newTitle: string) => setTitle(newTitle);
  const persistContent = (newContent: never[]) => setContent(newContent);
  const resetPoem = () => {
    setTitle('');
    setContent([]);
  };

  return {
    title,
    content,
    persistTitle,
    persistContent,
    resetPoem
  };
};
