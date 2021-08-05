import { ArrayGroupBy } from "src/utils/dataStructions";

export interface WeatherData {
  city: City;
  daysSummary: ArrayGroupBy<WeatherPoint>[];
}
export interface WeatherPoint {
  id: string;
  date: string;
  time: string;
  minTemp: number;
  maxTemp: number;
  unit: string;
  icon: string;
}

export interface City {
  id: number;
  name: string;
  country: string;
}

export interface WeatherApiResponse {
  city: CityApiResponse;
  list: WeatherDataPointsApiResponse[];
}

export interface CityApiResponse {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherDataPointsApiResponse {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}
