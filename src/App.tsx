import React, { useReducer, useEffect } from "react";
import { getCoordinates } from "@/lib/api/geo-api";
import { getWeatherData } from "@/lib/api/weather-api";
import { DEFAULT_CITY } from "@/lib/constants";
import { initialState, weatherReducer } from "@/lib/reducer";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastList } from "@/components/ForecastList";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { CurrentWeatherSkeleton } from "@/components/skeletons/CurrentWeatherSkeleton";
import { ForecastListSkeleton } from "@/components/skeletons/ForecastListSkeleton";

import { useTranslation } from "react-i18next";

function App(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const { city, weather, loading, error, locationName } = state;

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  const handleSearch = async (searchCity?: string) => {
    const cityToSearch = searchCity || city;
    if (!cityToSearch.trim()) return;

    dispatch({ type: "FETCH_START" });

    try {
      const coords = await getCoordinates(cityToSearch);
      if (!coords) {
        dispatch({ type: "FETCH_ERROR", payload: t("error") });
        return;
      }

      const data = await getWeatherData(coords.latitude, coords.longitude);
      if (data) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            weather: data,
            locationName: `${coords.name}, ${coords.country}`,
          },
        });
      } else {
        dispatch({ type: "FETCH_ERROR", payload: t("error") });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "FETCH_ERROR", payload: t("error") });
    }
  };

  useEffect(() => {
    handleSearch(DEFAULT_CITY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      dir={dir}
      className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8 font-sans"
    >
      {/* Main Container */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header & Search */}
        <Header>
          <SearchBar
            setCity={(val) => dispatch({ type: "SET_CITY", payload: val })}
            handleSearch={handleSearch}
            loading={loading}
          />
        </Header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Main Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CurrentWeatherSkeleton />
            <ForecastListSkeleton />
          </div>
        ) : (
          weather && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CurrentWeather weather={weather} locationName={locationName} />
              <ForecastList weather={weather} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
