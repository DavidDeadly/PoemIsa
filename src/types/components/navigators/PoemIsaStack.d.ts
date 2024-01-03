import { SCREENS } from '@/constants';

const PoemIsaStackParamListValues = {
  [SCREENS.APP.APP]: undefined,
  [SCREENS.APP.CAPTURE]: undefined,
  [SCREENS.APP.WRITE]: {
    poemId: ''
  },
  [SCREENS.APP.POEM_DETAILED]: {
    poemId: ''
  }
};

type PoemIsaStackParamListValuesType = typeof PoemIsaStackParamListValues;

type PoemIsaStackParamList = {
  [K in keyof PoemIsaStackParamListValuesType]: PoemIsaStackParamListValuesType[K];
};

const PoemIsaHomeTabsParamListValues = {
  [SCREENS.MAIN.HOME]: undefined,
  [SCREENS.MAIN.CREATE]: undefined,
  [SCREENS.MAIN.PROFILE]: undefined
};

type PoemIsaHomeTabsParamListValuesType = typeof PoemIsaHomeTabsParamListValues;

type PoemIsaHomeTabsParamList = {
  [K in keyof PoemIsaHomeTabsParamListValuesType]: PoemIsaHomeTabsParamListValuesType[K];
};
