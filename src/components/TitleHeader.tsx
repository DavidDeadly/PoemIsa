import { FC, PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

type TitleHeaderProps = PropsWithChildren<{ isPlaceholder: boolean }>;

export const TitleHeader: FC<TitleHeaderProps> = ({
  children,
  isPlaceholder
}) => {
  if (isPlaceholder) {
    return (
      <Text
        style={[styles.titleText, styles.placeholderStyle]}
        numberOfLines={1}>
        Título...
      </Text>
    );
  }

  return (
    <Text style={[styles.titleText, styles.textStyle]} numberOfLines={1}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black'
  },
  titleText: {
    fontSize: 20,
    width: 150,
    fontWeight: 'bold'
  },
  placeholderStyle: {
    color: 'gray'
  }
});
