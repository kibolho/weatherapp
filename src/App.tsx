import { GlobalStyle } from "./styles/global";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes/routes";
import { WeatherProvider } from "./services/hooks/useWeather";

export function App() {
  return (
    <WeatherProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </WeatherProvider>
  );
}
