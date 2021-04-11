import { createGlobalStyle } from "styled-components";

// TODO: Add CSS Vars
const GlobalCss = createGlobalStyle`
  body, html {
    line-height: 1.2;
    width: 100%;
    height: 100%;
  }
  *, *:after, *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
  }
  #root {
    padding: 10vmin;
  }
  button {
    background: none;
    font-weight: 600;
    letter-spacing: .03rem;
    outline: none;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
  }
  :focus {
    // TODO: add some distance to the border or outline
    border: 1px solid dotted;
  }
`;

export default GlobalCss;
