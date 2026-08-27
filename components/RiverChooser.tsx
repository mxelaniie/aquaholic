import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export default function RiverChooser({
  river,
  setRiver,
}: {
  river: string;
  setRiver: (river: string) => void;
}) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={river}
        onValueChange={(itemValue) => setRiver(itemValue)}
      >
        <Picker.Item label="Aare" value="Aare" />
        <Picker.Item label="Emme" value="Emme" />
        <Picker.Item label="Reuss" value="Reuss" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
  },
});
