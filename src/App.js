import { createGlobalStyle } from "styled-components";

const CSSReset = createGlobalStyle`
  body, html {
    width: 100%;
    height: 100%;
  }
  *, *:after, *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <CSSReset />
      <div>Hey</div>
    </>
  );
}

export default App;
