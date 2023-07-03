import { FC, useState } from 'react';
import { Pressable } from 'react-native';

import { TitleHeader } from '@/components/TitleHeader';
import { ChangePoemTitleModal } from '@/components/ChangePoemTitleModal';

type WritePoemTitleProps = {
  initialTitle: string;
  persistTitle: (newTitle: string) => void;
};

export const WritePoemHeaderTitle: FC<WritePoemTitleProps> = ({
  initialTitle,
  persistTitle
}) => {
  const [changeName, setChangeName] = useState(false);
  const [title, setTitle] = useState<string>(initialTitle);

  const openModal = () => setChangeName(true);
  const closeModal = () => {
    persistTitle(title);
    setChangeName(false);
  };

  const onChangeTitle = (newTitle: string) => setTitle(newTitle);

  return (
    <>
      <ChangePoemTitleModal
        visible={changeName}
        changeTitle={onChangeTitle}
        title={title}
        closeModal={closeModal}
      />
      <Pressable onPress={openModal}>
        <TitleHeader isPlaceholder={!title}>{title}</TitleHeader>
      </Pressable>
    </>
  );
};
