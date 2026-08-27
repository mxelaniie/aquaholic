import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { default as RiverChooser } from "../../components/RiverChooser";
import TopStations from "../../components/TopStations";
import { useRiverStore } from "../store/RiverStore";
import { globalStyles } from "../styles/global";
import { getWaterStations, WaterStation } from "../utilities/getStations";

export default function HomeScreen() {
  const [stations, setStations] = useState<WaterStation[]>([]);
  const river = useRiverStore((state) => state.river);
  const setRiver = useRiverStore((state) => state.setRiver);

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
        <Text style={globalStyles.title}>Aquaholic🍻</Text>
      </View>
      <HomeHeader />
      <RiverChooser river={river} setRiver={setRiver} />
      <TopStations />
    </ScrollView>
  );
}
