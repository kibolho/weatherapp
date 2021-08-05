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

export const Container = styled.main`
  max-width: 1020px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

export const WeatherGraphContainer = styled.div`
  margin: 20px 0px;
  animation: ${appearAnimation} ease-in-out 0.9s;
  transition: filter 0.2s;
`;
