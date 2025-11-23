import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Wind, Droplets, Thermometer } from "lucide-react";
import type { WeatherData } from "@/lib/api/weather-api";
import { getWeatherInfo } from "@/lib/weather-utils";
import { useTranslation } from "react-i18next";

interface CurrentWeatherProps {
  weather: WeatherData;
  locationName: string;
}

export function CurrentWeather({ weather, locationName }: CurrentWeatherProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const { icon: WeatherIcon, label } = getWeatherInfo(
    weather.current_weather.weathercode
  );

  return (
    <Card className="md:col-span-2 bg-linear-to-br from-blue-600 to-blue-800 border-none text-white shadow-2xl relative overflow-hidden">
      <CardContent className="p-8 relative z-10 flex flex-col justify-between h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-blue-100 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{locationName}</span>
            </div>
            <p className="text-sm text-blue-200">
              {t("today")},{" "}
              {new Date().toLocaleDateString(
                lang === "ar" ? "ar-EG" : "en-US",
                { month: "short", day: "numeric" }
              )}
            </p>
          </div>
          <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
            {t("live")}
          </div>
        </div>

        <div className="flex items-center gap-6 my-8">
          <WeatherIcon className="w-24 h-24 text-blue-200 drop-shadow-lg" />
          <div>
            <div className="text-7xl font-bold tracking-tighter">
              {Math.round(weather.current_weather.temperature)}°
            </div>
            <p className="text-xl text-blue-100 font-medium">{label}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 bg-black/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-1">
            <Wind className="w-5 h-5 text-blue-200" />
            <span className="text-sm font-medium">
              {weather.current_weather.windspeed} km/h
            </span>
            <span className="text-xs text-blue-300">{t("wind")}</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-white/10">
            <Droplets className="w-5 h-5 text-blue-200" />
            <span className="text-sm font-medium">
              {weather.hourly.precipitation_probability[0]}%
            </span>
            <span className="text-xs text-blue-300">{t("humidity")}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Thermometer className="w-5 h-5 text-blue-200" />
            <span className="text-sm font-medium">
              {Math.round(weather.daily.temperature_2m_max[0])}°
            </span>
            <span className="text-xs text-blue-300">{t("feelsLike")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
