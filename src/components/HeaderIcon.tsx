import { DirectRight, Eraser, Icon } from 'iconsax-react-native';
import { ColorValue } from 'react-native';

export const enum HEADER_ICONS_NAME {
  SAVE = 'save',
  ERASE = 'erase'
}

const HeaderIconsMap = new Map<string, Icon>([
  [HEADER_ICONS_NAME.SAVE, DirectRight],
  [HEADER_ICONS_NAME.ERASE, Eraser]
]);

export const HeaderIcon = ({
  name,
  style,
  color,
  size
}: {
  name: string;
  style?: any;
  color?: ColorValue;
  size?: number;
}) => {
  if (typeof color !== 'string') return null;

  const IconHeader = HeaderIconsMap.get(name);

  if (!IconHeader) return null;

  return <IconHeader size={size} color={color} style={style} variant="Bulk" />;
};
