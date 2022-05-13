import React, { FC, ReactElement } from "react";
import { createGlobalStyle } from "styled-components";
import { Dashboard } from "../components/Dashboard";
import { SCREEN_WIDTH } from "../config";

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

    @media screen and (max-width: ${SCREEN_WIDTH.LARGE}px) {
      font-size: 14px;
    }

    @media screen and (max-width: ${SCREEN_WIDTH.MEDIUM}px) {
      font-size: 12px;
    }

    @media screen and (max-width: ${SCREEN_WIDTH.SMALL}px) {
      font-size: 14px;
    }

    @media screen and (max-width: ${SCREEN_WIDTH.XSMALL}px) {
      font-size: 14px;
    }
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
