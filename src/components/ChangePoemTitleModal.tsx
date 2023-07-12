import { FC, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import Toast from 'react-native-toast-notifications';
import { Button } from '@/components/Button';
import { Warning2 } from 'iconsax-react-native';
import { COLORS } from '@/constants';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { MAX_TITLE_LENGHT } from '@/constants/poems';

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

type ChangePoemTitleModalProps = {
  visible: boolean;
  title: string;
  closeModal: () => void;
  changeTitle: (newTitle: string) => void;
};

export const ChangePoemTitleModal: FC<ChangePoemTitleModalProps> = ({
  visible,
  title,
  closeModal,
  changeTitle
}) => {
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

    changeTitle(newTitle);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={closeModal}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={closeModal}>
        <View style={styles.modalView}>
          <Toast id="tooLogTitleToastWarning" ref={toastRef} />
          <Text style={styles.modalTitle}>Título</Text>

          <TextInput
            autoFocus
            style={styles.inputTitle}
            onChangeText={handleTitleChange}
            value={title}
            multiline
            maxLength={MAX_TITLE_LENGHT}
          />
          <Button style={styles.saveButton} onPress={closeModal}>
            <Text>Perfecto!</Text>
          </Button>
        </View>
      </TouchableOpacity>
    </Modal>
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
  modalTitle: {
    color: 'black',
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
