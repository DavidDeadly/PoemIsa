import { FC, useState } from 'react';
import { Pressable } from 'react-native';

import { TitleHeader } from '@/components/TitleHeader';
import { ChangePoemTitleModal } from '@/components/ChangePoemTitleModal';

type WritePoemTitleProps = {
  children: string;
  tintColor?: string;
};

export const WritePoemHeaderTitle: FC<WritePoemTitleProps> = _props => {
  const [changeName, setChangeName] = useState(false);
  const [title, setTitle] = useState('');

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);

  const closeModal = () => setChangeName(false);
  const openModal = () => setChangeName(true);

  return (
    <>
      <ChangePoemTitleModal
        visible={changeName}
        changeTitle={handleTitleChange}
        title={title}
        closeModal={closeModal}
      />
      <Pressable onPress={openModal}>
        <TitleHeader isPlaceholder={!title}>{title}</TitleHeader>
      </Pressable>
    </>
  );
};
