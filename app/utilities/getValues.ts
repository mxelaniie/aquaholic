import { getWaterStations } from "./getStations";

export type StationValues = {
  stationNo: string;
  parameterName: string;
  timestamp: string;
  value: number | null;
};

const ENDPOINT = "https://data.bafu.admin.ch/api";

export async function getStationValues(): Promise<StationValues[]> {
  // Stationen des ausgewählten Flusses holen
  const riverStations = await getWaterStations();

  // Stationsnummern der gewünschten Stationen
  const stationNumbers = riverStations.map((station) => station.no);

  // Live-Daten von BAFU holen
  const query = `
  query ObservationsDataLive {
    water {
      observations {
        data_live(
          where: {
            stationNo: {
              _in: [${stationNumbers.map((no) => `"${no}"`).join(", ")}]
            }
          }
        ) {
          stationNo
          parameterName
          timestamp
          value
        }
      }
    }
  }
`;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  const values: StationValues[] = data.data.water.observations.data_live;

  // Nur Wassertemperatur
  const temperatureValues = values.filter(
    (item) => item.parameterName === "WT",
  );

  // Pro Station nur den neuesten Wert behalten
  const latestValues: StationValues[] = [];

  temperatureValues.forEach((item) => {
    const stationAlreadyExists = latestValues.some(
      (value) => value.stationNo === item.stationNo,
    );

    if (!stationAlreadyExists) {
      latestValues.push(item);
    }
  });

  return latestValues;
}
