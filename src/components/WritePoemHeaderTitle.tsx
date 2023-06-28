import { FC, useState } from 'react';
import { Pressable } from 'react-native';

import { TitleHeader } from '@/components/TitleHeader';
import { ChangePoemTitleModal } from '@/components/ChangePoemTitleModal';

type WritePoemTitleProps = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const WritePoemHeaderTitle: FC<WritePoemTitleProps> = ({
  title,
  changeTitle
}) => {
  const [changeName, setChangeName] = useState(false);

  const closeModal = () => setChangeName(false);
  const openModal = () => setChangeName(true);

  return (
    <>
      <ChangePoemTitleModal
        visible={changeName}
        changeTitle={changeTitle}
        title={title}
        closeModal={closeModal}
      />
      <Pressable onPress={openModal}>
        <TitleHeader isPlaceholder={!title}>{title}</TitleHeader>
      </Pressable>
    </>
  );
};
