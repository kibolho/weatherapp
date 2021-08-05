import { createContext, useContext, useEffect, useState } from "react";

import { OPEN_WEATHER_KEY } from "../../../constants";
import { TempUnit } from "../../../model/tempUnit";
import { WeatherData } from "./types";
import { api } from "../../../services/api";
import { factoryWeather } from "./factory";

interface UseWeatherProps {
  city?: string;
  unit?: TempUnit;
}

interface WeatherContextData {
  weatherDays?: WeatherData;
  setWeatherDays: React.Dispatch<React.SetStateAction<WeatherData | undefined>>;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentCity?: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface WeatherProviderProps {
  children: React.ReactNode;
}

const WeatherContext = createContext<WeatherContextData>(
  {} as WeatherContextData
);

export function WeatherProvider({ children }: WeatherProviderProps) {
  const [weatherDays, setWeatherDays] = useState<WeatherData>();
  const [error, setError] = useState<string>();
  const [currentCity, setCurrentCity] = useState<string>();

  return (
    <WeatherContext.Provider
      value={{
        currentCity,
        setCurrentCity,
        weatherDays,
        setWeatherDays,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = ({
  city,
  unit = TempUnit.IMPERIAL,
}: UseWeatherProps) => {
  const {
    currentCity,
    setCurrentCity,
    weatherDays,
    setWeatherDays,
    error,
    setError,
  } = useContext(WeatherContext);

  useEffect(() => {
    if (!!city && currentCity !== city) {
      setCurrentCity(city);
      api
        .get("/forecast", {
          params: {
            q: currentCity ?? city,
            appId: OPEN_WEATHER_KEY,
            units: unit,
          },
        })
        .then((response) => {
          console.log(response);
          setWeatherDays(factoryWeather(response.data, unit));
        })
        .catch(function (e) {
          console.error(e);
          setError(e.msg ?? "Unknown Error");
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return {
    city: weatherDays?.city,
    daysSummary: weatherDays?.daysSummary,
    error,
  };
};
