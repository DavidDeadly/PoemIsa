import { COLORS } from '@/constants';
import { BatteryFull, More } from 'iconsax-react-native';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export const InfinitQueryFooter: FC<{
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  iconSize: number;
}> = ({ hasNextPage, isFetchingNextPage, iconSize }) => {
  if (hasNextPage === false) {
    return (
      <View style={container}>
        <BatteryFull size={iconSize} color={COLORS.MAIN.PRIMARY} />
      </View>
    );
  }

  if (isFetchingNextPage) {
    return (
      <View style={container}>
        <More size={iconSize} color={COLORS.MAIN.PRIMARY} />
      </View>
    );
  }

  return null;
};

const { container } = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
