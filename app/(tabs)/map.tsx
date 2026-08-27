import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import WaterMap from "../../components/WaterMap";
import { useRiverStore } from "../store/RiverStore";

import { getWaterStations, WaterStation } from "../utilities/getStations";
import { getStationValues, StationValues } from "../utilities/getValues";

export default function AddMealScreen() {
  const [stations, setStations] = useState<WaterStation[]>([]);
  const river = useRiverStore((state) => state.river);

  useEffect(() => {
    async function loadStations() {
      const fetchedStations = await getWaterStations(river);
      setStations(fetchedStations);
    }

    loadStations();
  }, [river]);

  const [stationValues, setStationValues] = useState<StationValues[]>([]);

  useEffect(() => {
    async function loadStationValues() {
      const fetchedStationValues = await getStationValues(river);
      setStationValues(fetchedStationValues);
    }
    loadStationValues();
  }, [river]);

  return (
    <View style={styles.container}>
      <WaterMap stations={stations} stationValues={stationValues} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
