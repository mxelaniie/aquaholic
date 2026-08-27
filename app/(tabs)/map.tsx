import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import WaterMap from "../../components/WaterMap";

import { getWaterStations, WaterStation } from "../utilities/getStations";
import { getStationValues, StationValues } from "../utilities/getValues";

export default function AddMealScreen() {
  const [stations, setStations] = useState<WaterStation[]>([]);

  useEffect(() => {
    async function loadStations() {
      const fetchedStations = await getWaterStations();
      setStations(fetchedStations);
    }

    loadStations();
  }, []);

  const [stationValues, setStationValues] = useState<StationValues[]>([]);

  useEffect(() => {
    async function loadStationValues() {
      const fetchedStationValues = await getStationValues();
      setStationValues(fetchedStationValues);
    }
    loadStationValues();
  }, []);

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
