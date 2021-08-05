import { Container, WeatherGraphContainer } from "./styles";

import Summary from "../Summary";
import WeatherGraph from "../WeatherGraph";
import { useParams } from "react-router-dom";

export function Dashboard() {
  let params = useParams<{ dayOfWeek?: string }>();

  return (
    <Container>
      <Summary dayOfWeek={params.dayOfWeek} />
      {!!params.dayOfWeek && (
        <WeatherGraphContainer>
        <WeatherGraph width={1000} height={300} dayOfWeek={params.dayOfWeek} />
        </WeatherGraphContainer>
      )}
    </Container>
  );
}
