import React, { FC, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { ILocation } from "../types";

type WatchfaceProps = {
  location: ILocation;
};

const getHoursMinutesSeconds = (timeZone: string): number[] => {
  const formattedTime =
    Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone,
    })
      .format(new Date())
      .split(" ")
      .shift() || "";

  return formattedTime.split(":").map((i) => parseInt(i)) as number[];
};

const getArrowDegrees = (
  hours: number,
  minutes: number,
  seconds: number
): { hours: number; minutes: number; seconds: number } => {
  const hourStep = 360 / 12;
  const minuteStep = 360 / 60;

  const hourDeg =
    hourStep * hours +
    (hourStep / 60) * minutes +
    (hourStep / 60 / 60) * seconds;

  const minDeg = minuteStep * minutes + (minuteStep / 60) * seconds;
  const secDeg = minuteStep * seconds;

  return {
    hours: hourDeg,
    minutes: minDeg,
    seconds: secDeg,
  };
};

export const Watchface: FC<WatchfaceProps> = ({ location }): ReactElement => {
  const hourMarks = new Array(12).fill(null);
  const minuteMarks = new Array(60).fill(null);

  const [arrowDegrees, setArrowDegrees] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval((): void => {
      setArrowDegrees(
        getArrowDegrees.apply(
          null,
          getHoursMinutesSeconds(location.timezone) as [number, number, number]
        )
      );
    }, 500);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [location, setArrowDegrees]);

  return (
    <StyledWatchface>
      {hourMarks.map((item, idx, arr) => (
        <StyledHourMark data-rotate-deg={(360 / arr.length) * idx} key={idx} />
      ))}
      {minuteMarks.map((item, idx, arr) => (
        <StyledMinuteMark
          data-rotate-deg={(360 / arr.length) * idx}
          key={idx}
        />
      ))}
      <StyledHourArrow data-rotate-deg={arrowDegrees.hours} />
      <StyledMinuteArrow data-rotate-deg={arrowDegrees.minutes} />
      <StyledSecondArrow data-rotate-deg={arrowDegrees.seconds} />
    </StyledWatchface>
  );
};

const StyledWatchface = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  margin: 0 auto;
  border: 0.5rem solid #000;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: inset 1rem 1em 1.5rem 0 rgba(0, 0, 0, 0.35),
    inset -1rem -1em 1.5rem 0 rgba(255, 255, 255, 0.35),
    1rem 1em 1.5rem 0 rgba(0, 0, 0, 0.35);

  &:after {
    position: absolute;
    display: block;
    content: " ";
    top: 50%;
    left: 50%;
    width: 1.75%;
    height: 1.75%;
    transform: translate(-50%, -50%);
    background-color: #000;
    border-radius: 50%;
  }
`;

const StyledHourMark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: ${(props: any) => `rotate(${props["data-rotate-deg"]}deg)`};

  &:after {
    position: absolute;
    top: 3%;
    left: 50%;
    display: block;
    content: " ";
    width: 0.5%;
    height: 5%;
    background-color: #000;
    transform: translateX(-50%);
  }
`;

const StyledMinuteMark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: ${(props: any) => `rotate(${props["data-rotate-deg"]}deg)`};

  &:after {
    position: absolute;
    top: 3%;
    left: 50%;
    display: block;
    content: " ";
    width: 0.125%;
    height: 1%;
    background-color: #000;
    opacity: 0.5;
    transform: translateX(-50%);
  }
`;

const StyledHourArrow = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: ${(props: any) => `rotate(${props["data-rotate-deg"]}deg)`};

  &:after {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: " ";
    width: 1.75%;
    height: 25%;
    background-color: #000;
  }
`;

const StyledMinuteArrow = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: ${(props: any) => `rotate(${props["data-rotate-deg"]}deg)`};

  &:after {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: " ";
    width: 0.75%;
    height: 35%;
    background-color: #000;
  }
`;

const StyledSecondArrow = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: ${(props: any) => `rotate(${props["data-rotate-deg"]}deg)`};
  /* transition: all 0.3s cubic-bezier(0.08, 1.47, 0.65, 0.92); */

  &:after {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: " ";
    width: 0.4%;
    height: 43%;
    background-color: red;
  }
`;
