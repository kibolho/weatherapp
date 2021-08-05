export enum TempUnit {
  METRIC = "metric",
  IMPERIAL = "imperial",
  STANDARD = "standard",
}

export const getTempUnitLabel = {
  [TempUnit.METRIC]: "°C",
  [TempUnit.IMPERIAL]: "°",
  [TempUnit.STANDARD]: "K"
}