import { COLORS } from "@/constants";
import { Refresh } from "iconsax-react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ListPoemsHeaderProps = {
  refetch: () => void
}

export function ListPoemsHeader({ refetch }: ListPoemsHeaderProps) {
  return <View style={container}>
    <Text style={title}>Poemas</Text>
    <TouchableOpacity style={refreshBtn} onPress={() => refetch()}>
      <Refresh size="40" color={COLORS.MAIN.PRIMARY} variant="Bulk" />
    </TouchableOpacity>
  </View>
}

const {
  title,
  container,
  refreshBtn
} = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  refreshBtn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: COLORS.MAIN.PRIMARY,
    fontSize: 40,
    fontFamily: 'MontserratAlternates-ExtraBoldItalic',
    marginBottom: 10
  }
})