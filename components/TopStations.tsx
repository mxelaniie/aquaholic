import { getWaterStations, WaterStation } from "@/app/utilities/getStations";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TopStations() {
  const [stations, setStations] = useState<WaterStation[]>([]);

  useEffect(() => {
    async function loadStations() {
      const fetchedStations = await getWaterStations();
      setStations(fetchedStations);
    }
    loadStations();
  }, []);

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.sectionTitle}>Erste 5 Stationen</Text>
      {stations.length === 0 ? (
        <Text style={styles.empty}>No Stations logged yet.</Text>
      ) : (
        stations.slice(0, 5).map((station) => (
          <Text style={styles.station} key={station.no}>
            {station.name} – {station.no}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  empty: {
    color: "#a0a0b0",
    fontSize: 14,
  },
  station: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
  },
});
