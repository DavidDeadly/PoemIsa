import auth from '@react-native-firebase/auth';
import { likePoem } from '@/services/Poems';
import { PoemNoti } from '@/types/models/poem';
import notifee, {
  AndroidStyle,
  EventDetail,
  EventType
} from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export const enum NOTIFICATION_ACTIONS {
  LIKE = 'like'
}

type Notification = {
  titleNoti: string;
  body: string;
  poem: PoemNoti;
};

export const onMessage = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
  const poem =
    typeof remoteMessage.data?.poem === 'string'
      ? JSON.parse(remoteMessage.data?.poem)
      : {};

  return displayNotification({
    titleNoti: remoteMessage.notification?.title ?? '',
    body: remoteMessage.notification?.body ?? '',
    poem
  });
};

const displayNotification = async ({ titleNoti, body, poem }: Notification) => {
  const channelId = await notifee.createChannel({
    id: 'poemisa',
    name: 'PoemIsa'
  });

  const { summary, title, text, authorPic, id } = poem;

  await notifee.displayNotification({
    title: titleNoti,
    body,
    data: {
      poemId: id
    },
    android: {
      sound: 'pageflip',
      channelId,
      largeIcon: authorPic,
      smallIcon: 'poemisa_notification_ic',
      style: {
        type: AndroidStyle.BIGTEXT,
        summary,
        title,
        text
      },
      actions: [
        {
          title: 'Me gusta',
          icon: 'poemisa_notification_ic',
          pressAction: {
            id: NOTIFICATION_ACTIONS.LIKE
          }
        }
      ],
      pressAction: {
        id: 'default'
      }
    }
  });
};

type NotificationEvent = {
  type: EventType;
  detail: EventDetail;
  navigate: (screen: string, params: Record<string, any>) => void;
};

export const notificationsEventHandler = async ({
  type,
  detail,
  navigate
}: NotificationEvent) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS) {
    navigate('Detalle', { poemId: notification?.data?.poemId });

    return notifee.cancelNotification(notification?.id ?? '');
  }

  if (
    type === EventType.ACTION_PRESS &&
    pressAction.id === NOTIFICATION_ACTIONS.LIKE
  ) {
    const user = auth().currentUser;

    await likePoem(notification?.data?.poemId, user?.uid);
    await notifee.cancelNotification(notification?.id ?? '');
  }
};
