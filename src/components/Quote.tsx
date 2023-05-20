import { View, Text, ViewStyle, StyleSheet } from 'react-native';
import { FC, useMemo } from 'react';

import { PoetryQuotes } from '@/types/models/poetryQuotes';

interface QuoteProps {
  quote: PoetryQuotes;
  fontSize: number;
  styles?: ViewStyle;
}

export const Quote: FC<QuoteProps> = ({ styles, quote, fontSize }) => {
  const textStyles = useMemo(() => {
    return StyleSheet.create({
      quote: {
        fontSize,
        fontFamily: 'MontserratAlternates-BoldItalic'
      },
      author: {
        fontSize,
        fontFamily: 'MontserratAlternates-LightItalic'
      }
    });
  }, [fontSize]);

  return (
    <View style={styles}>
      <Text style={textStyles.quote}>{quote.content}</Text>
      <Text style={textStyles.author}>~{quote.author}~</Text>
    </View>
  );
};
