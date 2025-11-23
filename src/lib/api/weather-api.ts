import axios from "axios";

export interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  hourly: {
    temperature_2m: number[];
    precipitation_probability: number[];
    weathercode: number[];
    time: string[];
  };
  daily: {
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
  };
}

export async function getWeatherData(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
        hourly: "temperature_2m,precipitation_probability,weathercode",
        daily: "weathercode,temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
