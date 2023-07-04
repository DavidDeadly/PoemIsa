import {
  IsabelLoveMessages,
  NoWordsLoveMessage,
  StartLoveMessage
} from '@/constants/isabel';
import { getRandomIndex } from '@/helpers';
import { useRef, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

export const useIsabelLoveMessage = () => {
  const [isLastMessage, setIsLastMessage] = useState(false);
  const loveMessages = useRef(IsabelLoveMessages);
  const loveMessage = useRef(StartLoveMessage);
  const toast = useToast();

  const showLoveToast = (message = NoWordsLoveMessage) => {
    toast.show(message, {
      type: 'loveIsabel',
      placement: 'bottom'
    });
  };

  const getNewLoveMessage = () => {
    if (!loveMessage.current) {
      showLoveToast();
      setIsLastMessage(true);
      return;
    }

    showLoveToast(loveMessage.current);

    const randomIndex = getRandomIndex(0, IsabelLoveMessages.length - 1);
    const newMessage = IsabelLoveMessages[randomIndex];
    loveMessage.current = newMessage;

    loveMessages.current.splice(randomIndex, 1);
  };

  return {
    isLastMessage,
    getNewLoveMessage
  };
};
