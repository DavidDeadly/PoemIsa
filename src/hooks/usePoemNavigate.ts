import { PoemIsaStackParamList } from '@/types/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export const usePoemNavigate = () => {
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();

  const goToDetailed = (id: string) => {
    navigation.navigate('Detalle', {
      poemId: id
    });
  };

  return { goToDetailed };
};
