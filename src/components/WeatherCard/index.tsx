import {
  BottomContainer,
  Container,
  ContainerProps,
  DayLabel,
  IllustrationWeather,
  MaxTempLabel,
  MinTempLabel,
} from "./styles";

import React from "react";

interface WeatherCardProps extends ContainerProps {
  dayLabel: string;
  minTemp: number;
  maxTemp: number;
  unit: string;
  weatherIcon: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherIcon,
  isSelected,
  dayLabel,
  minTemp,
  maxTemp,
  unit,
  onClick,
}) => {
  return (
    <Container isSelected={isSelected} onClick={onClick}>
      <DayLabel>{dayLabel}</DayLabel>
      <IllustrationWeather src={weatherIcon} />
      <BottomContainer>
        <MaxTempLabel>
          {maxTemp}
          {unit}
        </MaxTempLabel>
        <MinTempLabel>
          {minTemp}
          {unit}
        </MinTempLabel>
      </BottomContainer>
    </Container>
  );
};

export default WeatherCard;
