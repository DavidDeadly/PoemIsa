import * as admin from "firebase-admin";

const NOTIFICATION = {
  edit: {
    TITLE: "¡Poema Editado!",
    DESCRIPTION: "El arte siempre se está mejorando..."
  },
  new: {
    TITLE: "¡Nuevo Poema!",
    DESCRIPTION: "Hay bellísimo arte esperándote...",
  },
};

const DEFAULT_TEXT = "Sin texto";

type PoemData = {
  id?:string;
  authorPic?: string;
  title?: string;
  text?: string
}

type Options = {
  isEditing: boolean;
}

const DEFAULT_OPTS: Options = {
  isEditing: false,
};

type Data = {
  poem: PoemData,
  opts?: Options
}

export const sendPoemNotification =
  async ({poem, opts = DEFAULT_OPTS}: Data) => {
    const {
      authorPic = "https://unavatar.io/unavatar.com",
      title = "Sin título",
      text = DEFAULT_TEXT,
      id = "",
    } = poem;

    const summary = text === DEFAULT_TEXT ?
      "Sin preview..." : `${text.substring(0, 30)}...`;

    const noti = opts.isEditing ? NOTIFICATION.edit : NOTIFICATION.new;

    await admin.messaging().send({
      notification: {
        title: noti.TITLE,
        body: noti.DESCRIPTION,
      },
      data: {
        poem: JSON.stringify({
          summary,
          id,
          authorPic,
          title,
          text,
        }),
      },
      topic: "Poems",
    });

    return {
      message: "Ok, send it!",
    };
  };
