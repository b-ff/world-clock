import React, { FC, ReactElement, useCallback, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Dashboard } from "../components/Dashboard";
import {
  DARK_THEME_KEY,
  DEFAULT_THEME,
  LIGHT_THEME_KEY,
  SCREEN_WIDTH,
  THEME_STORAGE_KEY,
} from "../config";
import { DarkTheme } from "../themes/dark";
import { LightTheme } from "../themes/light";
import { propFromTheme } from "../utils";

const storedThemeKey = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;

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
    color: ${propFromTheme("fontPrimaryColor")};
    background-color: ${propFromTheme("backgroundPrimaryColor")};

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

export const App: FC = (): ReactElement => {
  const [theme, setTheme] = useState(storedThemeKey);

  const toggleTheme = useCallback(() => {
    const updatedValue =
      theme === LIGHT_THEME_KEY ? DARK_THEME_KEY : LIGHT_THEME_KEY;
    setTheme(updatedValue);
    localStorage.setItem(THEME_STORAGE_KEY, updatedValue);
  }, [theme, setTheme]);

  return (
    <ThemeProvider theme={theme === LIGHT_THEME_KEY ? LightTheme : DarkTheme}>
      <Dashboard onToggleTheme={toggleTheme} />
      <GlobalStyle />
    </ThemeProvider>
  );
};
