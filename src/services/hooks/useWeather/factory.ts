import { TempUnit, getTempUnitLabel } from "../../../model/tempUnit";
import { WeatherApiResponse, WeatherData, WeatherPoint } from "./types";

import { arrayGroupBy } from "src/utils/dataStructions";

export const factoryWeather = (
  data: WeatherApiResponse,
  unit: TempUnit
): WeatherData => {
  return {
    city: {
      id: data.city.id,
      name: data.city.name,
      country: data.city.country,
    },
    daysSummary: arrayGroupBy<WeatherPoint>(
      data.list.map((item) => {
        const date = new Date(item.dt_txt)
        return {
          id: String(item.dt),
          date: date.toLocaleString("en", {
            weekday: "short",
          }),
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          unit: getTempUnitLabel[unit],
          icon: generateIconURLOpenWeather(item.weather[0].icon),
        };
      }),
      "date"
    ).slice(0, 5),
  };
};

const generateIconURLOpenWeather = (weatherIcon: string): string => {
  return "http://openweathermap.org/img/w/" + weatherIcon + ".png";
};
