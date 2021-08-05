import { Dashboard } from "src/components/Dashboard/index";
import { Header } from "src/components/Header/index";
import { useWeather } from "src/services/hooks/useWeather";

export default function Home() {
  useWeather({ city: "Vitória, Brasil" });

  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}
