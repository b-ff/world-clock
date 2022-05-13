import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { propFromTheme } from "../utils";

type ThemeToggleProps = {
  onToggle: () => void;
};

export const ThemeToggle: FC<ThemeToggleProps> = ({
  onToggle,
  ...props
}): ReactElement => (
  <StyledToggle onClick={onToggle} {...props}>
    <FontAwesomeIcon icon={faMoon} /> / <FontAwesomeIcon icon={faSun} />
  </StyledToggle>
);

const StyledToggle = styled.button`
  padding: 0.5em;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  background-color: ${propFromTheme("backgroundPrimaryColor")};
  color: ${propFromTheme("fontPrimaryColor")};
  border: 1px solid ${propFromTheme("fontPrimaryColor")};
  border-radius: 0.5em;
  cursor: pointer;
  opacity: 0.25;
  transition: opacity 0.3s ease-in-out;

  &:hover,
  &:active {
    opacity: 0.5;
  }
`;
