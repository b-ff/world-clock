import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { ILocation } from "../types";
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
  padding: 1rem;

  small {
    font-size: 1rem;
    font-weight: 100em;
    margin-top: 1rem;
  }
`;

const StyledDescription = styled.p`
  font-size: 0.75rem;
  color: #aaa;
`;

const StyledRemoveLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  color: #ccc;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  margin: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
`;
