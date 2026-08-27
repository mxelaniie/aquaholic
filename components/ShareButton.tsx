import { Ionicons } from "@expo/vector-icons";
import { Platform, Share, TouchableOpacity } from "react-native";
import { colors } from "../app/styles/global";
import { WaterStation } from "../app/utilities/getStations";

type ShareButtonProps = {
  stations: WaterStation[];
};

export default function ShareButton({ stations }: ShareButtonProps) {
  const handleShare = async () => {
    if (Platform.OS === "web") {
      window.alert("Funktion in Web-Browser nicht verfuegbar.");
      return;
    }

    const stationNames = stations.map((station) => station.name).join(", ");

    await Share.share({
      message: `Water Stations: ${stationNames}`,
    });
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
