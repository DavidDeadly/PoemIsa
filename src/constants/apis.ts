import Config from 'react-native-config';

export const APIS = {
  WEB_CLIENT_ID: Config.WEB_CLIENT_ID,
  OPEN_AI_API_KEY: Config.OPENAI_API_KEY
} as const;
