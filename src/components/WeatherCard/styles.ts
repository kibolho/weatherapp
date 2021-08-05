import styled, { keyframes } from "styled-components";

const appearAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50 {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

export interface ContainerProps {
  isSelected?: boolean;
}
export const Container = styled.button<ContainerProps>`
  ${({ isSelected }: ContainerProps) =>
    isSelected ? "border: 1px solid var(--background-dark)" : "border: 0px"};
  background: ${({ isSelected }: ContainerProps) =>
    isSelected ? "var(--background)" : "var(--shape)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.5rem;
  border-radius: 0.25rem;
  animation: ${appearAnimation} ease-in-out 0.9s;
  &:hover {
    filter: brightness(0.9);
  }
`;

export const BottomContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
`;

export const DayLabel = styled.label``;

export const MinTempLabel = styled.label`
  margin-left: 1rem;
`;

export const MaxTempLabel = styled.strong``;

export const IllustrationWeather = styled.img`
  width: 50px;
  height: 50px;
`;
