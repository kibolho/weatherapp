import { Container, Content } from "./styles";

import logoImg from "../../assets/logo.svg";

export function Header() {
  return (
    <Container>
      <Content>
        <p>WeatherApp</p>
        <img src={logoImg} height={100} alt="weatherapp" />
      </Content>
    </Container>
  );
}
