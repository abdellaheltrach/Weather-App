import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning } from "lucide-react";

// Helper to map WMO weather codes to icons and text
export const getWeatherInfo = (code: number) => {
  if (code === 0) return { icon: Sun, label: "Clear Sky" };
  if (code >= 1 && code <= 3) return { icon: Cloud, label: "Partly Cloudy" };
  if (code >= 45 && code <= 48) return { icon: Cloud, label: "Foggy" };
  if (code >= 51 && code <= 67) return { icon: CloudRain, label: "Rainy" };
  if (code >= 71 && code <= 77) return { icon: CloudSnow, label: "Snowy" };
  if (code >= 80 && code <= 82) return { icon: CloudRain, label: "Heavy Rain" };
  if (code >= 85 && code <= 86)
    return { icon: CloudSnow, label: "Snow Showers" };
  if (code >= 95 && code <= 99)
    return { icon: CloudLightning, label: "Thunderstorm" };
  return { icon: Cloud, label: "Cloudy" };
};
