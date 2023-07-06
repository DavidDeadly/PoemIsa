import { SCREENS } from '@/constants';

const PoemIsaStackParamListValues = {
  [SCREENS.APP.APP]: undefined,
  [SCREENS.APP.CAPTURE]: undefined,
  [SCREENS.APP.WRITE]: undefined,
  [SCREENS.APP.POEM_DETAILED]: {
    poemId: ''
  }
};

type PoemIsaStackParamListValuesType = typeof PoemIsaStackParamListValues;

type PoemIsaStackParamList = {
  [K in keyof PoemIsaStackParamListValuesType]: PoemIsaStackParamListValuesType[K];
};
