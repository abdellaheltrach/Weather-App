import axios from "axios";

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string; // State/Region
}

export async function getCoordinates(
  city: string
): Promise<GeocodingResult | null> {
  try {
    const response = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: city,
          count: 1,
          language: "en",
          format: "json",
        },
      }
    );
    const data = response.data;
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
}

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (!query || query.length < 2) return [];

  try {
    const response = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: query,
          count: 5,
          language: "en",
          format: "json",
        },
      }
    );
    const results: GeocodingResult[] = response.data.results || [];

    // Filter out duplicates based on name, admin1, and country
    const uniqueResults = results.filter(
      (city, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.name === city.name &&
            t.country === city.country &&
            t.admin1 === city.admin1
        )
    );

    return uniqueResults;
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string | null> {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
        },
        headers: {
          "User-Agent": "WeatherApp/1.0",
        },
      }
    );

    const address = response.data.address;
    const city =
      address.city || address.town || address.village || address.county;
    const country = address.country;

    return city && country ? `${city}, ${country}` : null;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return null;
  }
}
