import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #E52E4D;
    --blue: #5429CC;
    --green: #33CC95;

    --blue-light: #6933FF;

    --text-title: #888888;
    --text-body: #BABABA;

    --background: #F0F2F5;
    --background-dark: #222222;
    --shape: #FFFFFF;

    --input-background: #E7E9EE;
    --input-border: #D7D7D7;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // => 15px
    }
    @media (max-width: 700px) {
      font-size: 87.5%; // => 14px
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  button:focus, input:focus, textarea:focus {
    outline: 0;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;