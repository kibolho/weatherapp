import { createContext, useContext, useEffect, useState } from "react";

import { Coordinates } from "src/model/coordinates";
import { OPEN_WEATHER_KEY } from "../../../constants";
import { TempUnit } from "../../../model/tempUnit";
import { WeatherData } from "./types";
import { api } from "../../../services/api";
import { factoryWeather } from "./factory";

interface UseWeatherProps {
  coordinates?: Coordinates;
  unit?: TempUnit;
}

interface WeatherContextData {
  weatherDays?: WeatherData;
  setWeatherDays: React.Dispatch<React.SetStateAction<WeatherData | undefined>>;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentCoordinates?: Coordinates;
  setCurrentCoordinates: React.Dispatch<
    React.SetStateAction<Coordinates | undefined>
  >;
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
  const [currentCoordinates, setCurrentCoordinates] = useState<
    Coordinates | undefined
  >();

  return (
    <WeatherContext.Provider
      value={{
        currentCoordinates,
        setCurrentCoordinates,
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
  coordinates,
  unit = TempUnit.IMPERIAL,
}: UseWeatherProps) => {
  const {
    currentCoordinates,
    setCurrentCoordinates,
    weatherDays,
    setWeatherDays,
    error,
    setError,
  } = useContext(WeatherContext);

  useEffect(() => {
    if (!!coordinates && coordinates !== currentCoordinates) {
      setCurrentCoordinates(coordinates);
      api
        .get("/forecast", {
          params: {
            lat: currentCoordinates?.lat ?? coordinates.lat,
            lon: currentCoordinates?.lon ?? coordinates.lon,
            appId: OPEN_WEATHER_KEY,
            units: unit,
          },
        })
        .then((response) => {
          setWeatherDays(factoryWeather(response.data, unit));
        })
        .catch(function (e) {
          console.error(e);
          setError(e.msg ?? "Unknown Error");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return {
    city: weatherDays?.city,
    daysSummary: weatherDays?.daysSummary,
    error,
  };
};
