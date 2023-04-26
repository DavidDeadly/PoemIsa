import { CONSTS } from '@/constants';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: CONSTS.OPEN_AI_API_KEY
});

export const openai = new OpenAIApi(configuration);
