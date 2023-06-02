import { FC } from 'react';

import { TabBarIconProps } from '@/types/components/Icons';

export const TabBarIcon: FC<TabBarIconProps> = ({
  color,
  size,
  focused,
  TabIcon
}) => {
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
