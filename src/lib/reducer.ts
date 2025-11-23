import type { WeatherData } from "@/lib/api/weather-api";
import { DEFAULT_CITY } from "@/lib/constants";

export interface State {
  city: string;
  weather: WeatherData | null;
  loading: boolean;
  error: string;
  locationName: string;
}

export type Action =
  | { type: "SET_CITY"; payload: string }
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { weather: WeatherData; locationName: string };
    }
  | { type: "FETCH_ERROR"; payload: string };

export const initialState: State = {
  city: DEFAULT_CITY,
  weather: null,
  loading: false,
  error: "",
  locationName: "",
};

export function weatherReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "FETCH_START":
      return { ...state, loading: true, error: "", weather: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        weather: action.payload.weather,
        locationName: action.payload.locationName,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
