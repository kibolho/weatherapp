import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: -7rem;
  @media (max-width: 680px) {
    grid-template-columns: 2fr;
    justify-content: center;
    align-items: center;
  }
`;
