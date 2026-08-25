import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import WaterMap from "../../components/WaterMap";

import { getWaterStations, WaterStation } from "../utilities/getStations";

export default function AddMealScreen() {
  const [stations, setStations] = useState<WaterStation[]>([]);

  useEffect(() => {
    async function loadStations() {
      const fetchedStations = await getWaterStations();
      setStations(fetchedStations);
    }

    loadStations();
  }, []);

  return (
    <View style={styles.container}>
      <WaterMap stations={stations} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
