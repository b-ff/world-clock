import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { SCREEN_WIDTH } from "../config";
import { ILocation } from "../types";
import { propFromTheme } from "../utils";
import { Watchface } from "./Watchface";

type TimeProps = {
  location: ILocation;
  onRemove: () => void;
};

export const Time: FC<TimeProps> = ({ location, onRemove }): ReactElement => {
  return (
    <StyledTime>
      <StyledWatch>
        <Watchface location={location} />
      </StyledWatch>
      <StyledTitle>
        <span>{location.city || location.timezone}</span>
        {location.city && <small>{location.country}</small>}
      </StyledTitle>
      <StyledDescription>
        Timezone: {location.timezone}
        {location.isDST ? " (DST)" : ""}
      </StyledDescription>
      <StyledRemoveLink href="#" onClick={onRemove}>
        Remove
      </StyledRemoveLink>
    </StyledTime>
  );
};

const StyledTime = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 50%;

  &:hover a {
    opacity: 1;
    pointer-events: inherit;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.LARGE}px) {
    min-width: auto;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.MEDIUM}px) {
    min-width: 20%;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.SMALL}px) {
    min-width: 50%;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.XSMALL}px) {
    min-width: 100%;
  }
`;

const StyledWatch = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
`;

const StyledTitle = styled.h2`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 2rem;
  margin: 0;
  padding: 1rem 0;

  @media screen and (max-width: ${SCREEN_WIDTH.XSMALL}px) {
    padding: 0.5rem 0;
  }

  small {
    font-size: 1rem;
    font-weight: 100em;
    margin-top: 1rem;

    @media screen and (max-width: ${SCREEN_WIDTH.XSMALL}px) {
      margin: 0 0 0.5rem;
    }
  }
`;

const StyledDescription = styled.p`
  font-size: 0.75rem;
  color: ${propFromTheme("fontSecondaryColor")};
  text-align: center;

  @media screen and (max-width: ${SCREEN_WIDTH.XSMALL}px) {
    margin: 0 0 1rem;
    padding: 0;
    font-size: 0.8rem;
  }
`;

const StyledRemoveLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  color: ${propFromTheme("fontSecondaryColor")};
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  margin: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
`;
