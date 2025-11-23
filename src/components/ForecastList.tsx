import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud } from "lucide-react";
import type { WeatherData } from "@/lib/api/weather-api";
import { getWeatherInfo } from "@/lib/weather-utils";
import { useTranslation } from "react-i18next";

interface ForecastListProps {
  weather: WeatherData;
}

export function ForecastList({ weather }: ForecastListProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            {t("forecast")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weather.daily.time.slice(1, 5).map((time, i) => {
            const { icon: ForecastIcon, label } = getWeatherInfo(
              weather.daily.weathercode[i + 1]
            );
            return (
              <div
                key={time}
                className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
              >
                <span className="text-sm text-slate-300 w-16">
                  {new Date(time).toLocaleDateString(
                    lang === "ar" ? "ar-EG" : "en-US",
                    { weekday: "short" }
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <ForecastIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="text-white">
                    {Math.round(weather.daily.temperature_2m_max[i + 1])}°
                  </span>
                  <span className="text-slate-500">
                    {Math.round(weather.daily.temperature_2m_min[i + 1])}°
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
