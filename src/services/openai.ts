import { APIS } from '@/constants';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: APIS.OPEN_AI_API_KEY
});

export const openai = new OpenAIApi(configuration);
