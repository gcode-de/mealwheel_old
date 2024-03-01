import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  :root {
    --color-background: #FFFFFF; 
    --color-shadow: #000000; 
  }
  body {
    margin: 0;
    font-family: system-ui;
    padding: 20px;
  }
`;
