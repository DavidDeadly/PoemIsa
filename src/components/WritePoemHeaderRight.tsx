import { Lovely, Menu } from 'iconsax-react-native';
import {
  HeaderButtons,
  HiddenItem,
  Item,
  OverflowMenu
} from 'react-navigation-header-buttons';

import { PoemIsaHeaderButton } from '@/components/PoemIsaHeaderButton';
import { COLORS } from '@/constants';
import { useIsabelLoveMessage } from '@/hooks/useIsabelLoveMessage';
import { HEADER_ICONS_NAME } from '@/components/HeaderIcon';
import { Alert, ColorValue, StyleSheet } from 'react-native';

const OverFlowIcon = ({ color }: { color: ColorValue }) => {
  if (typeof color !== 'string') return null;

  return <Menu size={20} color={color} />;
};

export const WritePoemHeaderRight = ({
  savePoem
}: {
  savePoem: () => void;
}) => {
  const { isLastMessage, getNewLoveMessage } = useIsabelLoveMessage();

  return (
    <HeaderButtons HeaderButtonComponent={PoemIsaHeaderButton}>
      <Item
        title={HEADER_ICONS_NAME.ERASE}
        iconName={HEADER_ICONS_NAME.ERASE}
        onPress={() => Alert.alert('Crear borrador!')}
      />
      <Item
        title={HEADER_ICONS_NAME.SAVE}
        iconName={HEADER_ICONS_NAME.SAVE}
        onPress={savePoem}
      />
      <OverflowMenu
        color={COLORS.MAIN.PRIMARY}
        pressColor={COLORS.MAIN.PRIMARY}
        // @ts-ignore next line
        OverflowIcon={OverFlowIcon}>
        <HiddenItem
          disabled={isLastMessage}
          style={{
            backgroundColor: `${COLORS.MAIN.SECONDARY}`
          }}
          icon={<Lovely color={COLORS.MAIN.PRIMARY} size={40} variant="Bulk" />}
          title={'Isabel'}
          // @ts-ignore next line
          titleStyle={titleHiddenItems}
          onPress={getNewLoveMessage}
        />
      </OverflowMenu>
    </HeaderButtons>
  );
};

const { titleHiddenItems } = StyleSheet.create({
  titleHiddenItems: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
