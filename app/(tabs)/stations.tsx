import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ShareButton from "../../components/ShareButton";
import { useRiverStore } from "../store/RiverStore";
import { globalStyles } from "../styles/global";
import { getWaterStations, WaterStation } from "../utilities/getStations";
import { getStationValues, StationValues } from "../utilities/getValues";

export default function MealsScreen() {
  const { river } = useRiverStore();
  const [stationValues, setStationValues] = useState<StationValues[]>([]);

  useEffect(() => {
    async function loadStationValues() {
      const fetchedStationValues = await getStationValues(river);
      setStationValues(fetchedStationValues);
    }
    loadStationValues();
  }, [river]);

  const [stations, setStations] = useState<WaterStation[]>([]);
  useEffect(() => {
    async function loadStations() {
      const fetchedStations = await getWaterStations(river);
      setStations(fetchedStations);
    }
    loadStations();
  }, [river]);

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Alle Stationen mit Messwert</Text>
        <ShareButton stations={stations} />
      </View>
      <View style={{ marginTop: 30 }}>
        {stationValues.length === 0 ? (
          <Text style={globalStyles.empty}>No stations logged yet.</Text>
        ) : (
          stationValues.map((station) => (
            <View key={station.stationNo}>
              <Text style={globalStyles.empty}>
                {station.stationNo} - {station.parameterName}: {station.value}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
