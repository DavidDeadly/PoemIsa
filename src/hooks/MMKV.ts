import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export const useCurrentWrittingPoem = () => {
  const [title, setTitle] = useMMKVStorage('PoemTitle', storage, '');
  const [content, setContent] = useMMKVStorage('PoemContent', storage, []);

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);
  const handleContentChange = (newContent: never[]) => setContent(newContent);
  const resetPoem = () => {
    setTitle('');
    setContent([]);
  };

  return {
    title,
    content,
    handleTitleChange,
    handleContentChange,
    resetPoem
  };
};
