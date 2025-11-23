import { Search, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { searchCities, type GeocodingResult } from "@/lib/api/geo-api";

interface SearchBarProps {
  setCity: (city: string) => void;
  handleSearch: (city?: string) => void;
  loading: boolean;
}

export function SearchBar({ setCity, handleSearch, loading }: SearchBarProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue.length >= 2) {
        const results = await searchCities(inputValue);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (selectedCity: GeocodingResult) => {
    const cityName = selectedCity.name;
    setInputValue(cityName);
    setCity(cityName);
    handleSearch(cityName);
    setShowSuggestions(false);
  };

  return (
    <div
      className="flex w-full md:w-auto gap-2 items-center relative"
      ref={wrapperRef}
    >
      <div className="relative flex-1 md:w-80">
        <Search
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${
            lang === "ar" ? "right-3" : "left-3"
          }`}
        />
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          className={`bg-slate-950/50 border-slate-700 focus-visible:ring-blue-500 text-white placeholder:text-slate-500 ${
            lang === "ar" ? "pr-10" : "pl-10"
          }`}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSelectCity(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 group"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {suggestion.name}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {suggestion.admin1 ? `${suggestion.admin1}, ` : ""}
                    {suggestion.country}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        onClick={() => {
          if (inputValue.trim()) {
            handleSearch(inputValue);
            setShowSuggestions(false);
          }
        }}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px] cursor-pointer"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          t("searchButton")
        )}
      </Button>
    </div>
  );
}
