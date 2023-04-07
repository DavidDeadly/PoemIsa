import { TabBarIconProps } from '../types/components/Icons';

export const TabBarIcon = ({
  color,
  size,
  focused,
  TabIcon
}: TabBarIconProps) => {
  return (
    <TabIcon
      style={{
        transform: [{ translateY: focused ? -8 : 0 }]
      }}
      size={focused ? size + 5 : size}
      color={color}
      variant={focused ? 'Bulk' : 'TwoTone'}
    />
  );
};
