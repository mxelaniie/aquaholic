import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { WaterStation } from "../app/utilities/getStations";
import type { StationValues } from "../app/utilities/getValues";

type WaterMapProps = {
  stations: WaterStation[];
  stationValues: StationValues[];
};

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
});

export default function WaterMap({ stations, stationValues }: WaterMapProps) {
  return (
    <MapContainer
      center={[46.9481, 7.4474]}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {stations.map((station) => {
        const value = stationValues.find(
          (value) => value.stationNo === station.no && value.value !== null,
        );

        if (!value) {
          return null;
        }

        return (
          <Marker
            key={station.no}
            position={[station.latitude, station.longitude]}
            icon={icon}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              Temperatur: {value.value} °C
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
