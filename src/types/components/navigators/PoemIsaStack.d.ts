import { SCREENS } from '@/constants';

const PoemIsaStackParamListValues = {
  [SCREENS.APP.APP]: undefined,
  [SCREENS.APP.CAPTURE]: undefined,
  [SCREENS.APP.WRITE]: undefined
};

type PoemIsaStackParamListValuesType = typeof PoemIsaStackParamListValues;

type PoemIsaStackParamList = {
  [K in keyof PoemIsaStackParamListValuesType]: PoemIsaStackParamListValuesType[K];
};
