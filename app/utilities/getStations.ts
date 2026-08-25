export type WaterStation = {
  no: string;
  name: string;
  riverName: string;
  latitude: number;
  longitude: number;
};

const ENDPOINT = "https://data.bafu.admin.ch/api";

export async function getWaterStations(): Promise<WaterStation[]> {
  const query = `
    {
      water {
        observations {
          stations(
            where: { riverName: { _eq: "Aare" } }
          ) {
            name
            no
            riverName
            latitude
            longitude
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

  return data.data.water.observations.stations;
}
