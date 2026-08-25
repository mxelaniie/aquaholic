import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import TopStations from "../../components/TopStations";
import { globalStyles } from "../styles/global";
import { getWaterStations, WaterStation } from "../utilities/getStations";

export default function HomeScreen() {
  const [stations, setStations] = useState<WaterStation[]>([]);

  useEffect(() => {
    async function loadStations() {
      const fetchedStations = await getWaterStations();
      setStations(fetchedStations);
    }
    loadStations();
  }, []);

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Aquaholic🍻</Text>
      </View>
      <HomeHeader />
      <TopStations />
    </ScrollView>
  );
}
