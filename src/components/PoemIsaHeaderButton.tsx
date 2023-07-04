import { COLORS } from '@/constants';
import {
  HeaderButton,
  HeaderButtonProps
} from 'react-navigation-header-buttons';
import { HeaderIcon } from '@/components/HeaderIcon';

export const PoemIsaHeaderButton = (props: HeaderButtonProps) => {
  return (
    <HeaderButton
      IconComponent={HeaderIcon}
      color={COLORS.MAIN.PRIMARY}
      pressColor={COLORS.MAIN.PRIMARY}
      iconSize={30}
      {...props}
    />
  );
};
