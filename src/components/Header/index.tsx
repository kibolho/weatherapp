import { Container, Content } from "./styles";

import { City } from "src/services/hooks/useWeather/types";
import logoImg from "../../assets/logo.svg";

interface HeaderProps {
  city?: City;
}
const Header: React.FC<HeaderProps> = ({ city }) => {
  return (
    <Container>
      <Content>
        <p>WeatherApp</p>
        {!!city && (
          <p>
            {city.name} - {city.country}
          </p>
        )}
        <img src={logoImg} height={100} alt="weatherapp" />
      </Content>
    </Container>
  );
};

export default Header;
