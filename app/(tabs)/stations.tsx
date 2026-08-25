import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { getStationValues, StationValues } from "../utilities/getValues";

export default function MealsScreen() {
  const [stationValues, setStationValues] = useState<StationValues[]>([]);

  useEffect(() => {
    async function loadStationValues() {
      const fetchedStationValues = await getStationValues();
      setStationValues(fetchedStationValues);
    }
    loadStationValues();
  }, []);

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Alle Stationen</Text>
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
