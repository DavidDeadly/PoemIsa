import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export const useCurrentWrittingPoemTitle = () => {
  const [title, setTitle] = useMMKVStorage('PoemTitle', storage, '');

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);

  return {
    title,
    handleTitleChange
  };
};

export const useCurrentWrittingPoemContent = () => {
  const [content, setContent] = useMMKVStorage('PoemContent', storage, []);

  const handleContentChange = (newContent: any) => setContent(newContent);

  return {
    content,
    handleContentChange
  };
};
