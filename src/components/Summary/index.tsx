import { Container } from "./styles";
import WeatherCard from "../WeatherCard";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useWeather } from "../../services/hooks/useWeather";

interface SummaryProps {
  dayOfWeek?: string;
}
const Summary: React.FC<SummaryProps> = ({ dayOfWeek }) => {
  const { daysSummary = [] } = useWeather({})
  const history = useHistory();

  const goToDay = useCallback(
    (day: string) => history.push(`/${day}`),
    [history]
  );

  return (
    <Container>
      {daysSummary.map((daySummary) => {
        const day = daySummary.data[0];
        return (
          <WeatherCard
            key={day.id}
            onClick={() => goToDay(day.date)}
            dayLabel={day.date}
            minTemp={day.minTemp}
            maxTemp={day.maxTemp}
            weatherIcon={day.icon}
            unit={day.unit}
            isSelected={day.date === dayOfWeek}
          />
        );
      })}
    </Container>
  );
};

export default Summary;
