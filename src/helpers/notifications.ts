import { PoemNoti } from '@/types/models/poem';
import notifee, { AndroidStyle } from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

type Notification = {
  titleNoti: string;
  body: string;
  poem: PoemNoti;
};

export const onMessage = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) =>
  displayNotification({
    titleNoti: remoteMessage.notification?.title ?? '',
    body: remoteMessage.notification?.body ?? '',
    poem: JSON.parse(remoteMessage.data?.poem ?? {})
  });

const displayNotification = async ({ titleNoti, body, poem }: Notification) => {
  const channelId = await notifee.createChannel({
    id: 'poemisa',
    name: 'PoemIsa'
  });

  const { summary, title, text, authorPic } = poem;

  await notifee.displayNotification({
    title: titleNoti,
    body,
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
            id: 'like'
          }
        }
      ],
      pressAction: {
        id: 'default'
      }
    }
  });
};
