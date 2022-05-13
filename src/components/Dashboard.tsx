import React, { FC, ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { API_HOST, LOCATIONS_STORAGE_KEY, SCREEN_WIDTH } from "../config";
import { ILocation } from "../types";
import { noop } from "../utils";
import { ClockForm } from "./ClockForm";
import { ThemeToggle } from "./ThemeToggle";
import { Time } from "./Time";

const requestLocations = (location: string): Promise<ILocation> => {
  const url = `${API_HOST}${location}`;

  return fetch(url).then((response: Response): Promise<ILocation> => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

type DashboardProps = {
  onToggleTheme: () => void;
};

export const Dashboard: FC<DashboardProps> = ({
  onToggleTheme = noop,
}): ReactElement => {
  const storedLocations = JSON.parse(
    localStorage.getItem(LOCATIONS_STORAGE_KEY) || "[]"
  ) as ILocation[];

  const [locations, setLocations] = useState(storedLocations);

  const handleSubmit: (input: string) => void = useCallback(
    (input: string) => {
      requestLocations(input).then((location: ILocation): void => {
        setLocations([...locations, location]);
      });
    },
    [locations, setLocations]
  );

  const handleRemove: (index: number) => void = useCallback(
    (index) => {
      setLocations(locations.filter((item, idx) => idx !== index));
    },
    [locations, setLocations]
  );

  localStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(locations));

  return (
    <StyledDashboard>
      <StyledToolbar>
        <ThemeToggle onToggle={onToggleTheme} />
      </StyledToolbar>
      <StyledClockList>
        {locations.map(
          (location: ILocation, idx: number): ReactElement => (
            <Time
              key={location.city}
              location={location}
              onRemove={() => handleRemove(idx)}
            />
          )
        )}
      </StyledClockList>
      <ClockForm onSubmit={handleSubmit} />
    </StyledDashboard>
  );
};

const StyledDashboard = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100%;
`;

const StyledToolbar = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 1rem 0.75rem;
`;

const StyledClockList = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex: 1;
  max-width: 100%;
  width: 100%;
  min-height: 100%;

  @media screen and (max-width: ${SCREEN_WIDTH.LARGE}px) {
    flex-direction: row;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.MEDIUM}px) {
    min-width: 20%;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.SMALL}px) {
    display: block;

    & > div {
      display: inline-block;
    }
  }

  @media screen and (max-width: ${SCREEN_WIDTH.XSMALL}px) {
    flex-direction: column;
  }
`;
