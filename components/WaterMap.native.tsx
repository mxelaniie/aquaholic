import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getWaterStations, WaterStation } from "../app/utilities/getStations";
import { getStationValues, StationValues } from "../app/utilities/getValues";

type WaterMapProps = {
  stations: WaterStation[];
};

export default function WaterMap({ stations }: WaterMapProps) {
  const [stationValues, setStationValues] = useState<StationValues[]>([]);

  useEffect(() => {
    async function loadStationValues() {
      const fetchedStationValues = await getStationValues();
      setStationValues(fetchedStationValues);
    }
    loadStationValues();
  }, []);

  const [waterStation, setWaterStation] = useState<WaterStation[]>([]);

  useEffect(() => {
    async function loadStations() {
      const fetchedStations = await getWaterStations();
      setWaterStation(fetchedStations);
    }
    loadStations();
  }, []);

  const marker = waterStation
    .map((station) => {
      const value = stationValues.find(
        (value) => value.stationNo === station.no && value.value !== null,
      );

      if (!value) {
        return null;
      }

      return {
        ...station,
        temperature: value.value,
      };
    })
    .filter((station) => station !== null);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 46.9481,
        longitude: 7.4474,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
    >
      {marker.map((station) => (
        <Marker
          key={station.no}
          coordinate={{
            latitude: Number(station.latitude),
            longitude: Number(station.longitude),
          }}
          title={station.name}
          description={`Temperatur: ${station.temperature}°C`}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
