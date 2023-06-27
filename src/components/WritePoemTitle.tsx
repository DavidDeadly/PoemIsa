import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { FC, useRef, useState } from 'react';
import { Button } from '@/components/Button';
import Toast from 'react-native-toast-notifications';
import { Warning2 } from 'iconsax-react-native';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { COLORS } from '@/constants';

const MAX_TITLE_LENGHT = 50;
const warningToastConfig: ToastOptions = {
  placement: 'top',
  duration: 5000,
  animationType: 'zoom-in',
  animationDuration: 250,
  warningColor: 'orange',
  type: 'warning',
  swipeEnabled: true,
  warningIcon: (
    <Warning2 size={20} color={COLORS.TOASTS.COLOR_ICONS} variant="Broken" />
  )
};

type WritePoemTitleProps = {
  children: string;
  tintColor?: string;
};

export const WritePoemTitle: FC<WritePoemTitleProps> = _props => {
  const [changeName, setChangeName] = useState(false);
  const [title, setTitle] = useState('');
  const toastRef = useRef<Toast>(null);

  const handleTitleChange = (newTitle: string) => {
    const toast = toastRef.current;
    const toastId = toast?.props.id;

    if (!toastId) return;

    const isToastOpen = toast.isOpen(toastId);
    if (!isToastOpen && newTitle.length >= MAX_TITLE_LENGHT) {
      toastRef.current?.show(
        `Maximun title characters reached: ${MAX_TITLE_LENGHT}`,
        warningToastConfig
      );
    }

    setTitle(newTitle);
  };

  const closeModal = () => setChangeName(false);
  const openModal = () => setChangeName(true);

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={changeName}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Toast id="tooLogTitleToastWarning" ref={toastRef} />
            <Text style={[styles.textStyle, styles.modalTitle]}>
              Poem Title
            </Text>

            <TextInput
              autoFocus
              style={styles.inputTitle}
              onChangeText={handleTitleChange}
              value={title}
              multiline
              maxLength={MAX_TITLE_LENGHT}
            />
            <Button style={styles.saveButton} onPress={closeModal}>
              <Text>Save title</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <ScrollView horizontal={true}>
        <Pressable onPress={openModal}>
          {title ? (
            <Text
              style={[styles.titleText, styles.textStyle]}
              numberOfLines={1}>
              {title}
            </Text>
          ) : (
            <Text
              style={[styles.titleText, styles.placeholderStyle]}
              numberOfLines={1}>
              Title...
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLORS.MAIN.SECONDARY}80`
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MAIN.SECONDARY,
    borderRadius: 20,
    width: 250,
    padding: 30,
    elevation: 10
  },
  saveButton: {
    width: 100
  },
  titleText: {
    fontSize: 20,
    width: 150,
    fontWeight: 'bold'
  },
  textStyle: {
    color: 'black'
  },
  placeholderStyle: {
    color: 'gray'
  },
  modalTitle: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: '900'
  },
  inputTitle: {
    color: 'black',
    width: 200,
    textAlign: 'center',
    backgroundColor: 'white',
    fontSize: 20,
    borderRadius: 10,
    padding: 10
  }
});
