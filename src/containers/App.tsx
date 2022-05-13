import React, { FC, ReactElement } from "react";
import { createGlobalStyle } from "styled-components";
import { Dashboard } from "../components/Dashboard";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: 16px;
    font-weight: 200;
  }

  h1, h2, h3, h4, h5 {
    font-weight: 800;
  }

  small {
    font-weight: 100;
  }
`;

export const App: FC = (): ReactElement => (
  <>
    <GlobalStyle />
    <Dashboard />
  </>
);
