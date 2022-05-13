import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SCREEN_WIDTH } from "../config";
import { ILocation } from "../types";
import { propFromTheme } from "../utils";

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

const getDigitalTime = (timeZone: string): string => {
  return Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());
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

const getDateAndWeekDay = (
  location: ILocation
): { date: number; weekday: string } => {
  const formattedString = Intl.DateTimeFormat("en-US", {
    day: "numeric",
    weekday: "short",
    timeZone: location.timezone,
  }).format(Date.now());

  const [date, weekday] = formattedString.split(" ");
  return {
    date: parseInt(date),
    weekday,
  };
};

export const Watchface: FC<WatchfaceProps> = ({ location }): ReactElement => {
  const hourArrowRef = useRef(null);
  const minuteArrowRef = useRef(null);
  const secondArrowRef = useRef(null);

  const hourMarks = new Array(12).fill(null);
  const minuteMarks = new Array(60).fill(null);

  const [calendar, setCalendar] = useState(getDateAndWeekDay(location));
  const [digitalTime, setDigitalTime] = useState("00:00:00");

  useEffect(() => {
    const intervalId = setInterval((): void => {
      const { hours, minutes, seconds } = getArrowDegrees.apply(
        null,
        getHoursMinutesSeconds(location.timezone) as [number, number, number]
      );

      if (hourArrowRef.current) {
        const hourArrow = hourArrowRef.current as HTMLElement;
        hourArrow.style.transform = `rotate(${hours}deg)`;
      }

      if (minuteArrowRef.current) {
        const minuteArrow = minuteArrowRef.current as HTMLElement;
        minuteArrow.style.transform = `rotate(${minutes}deg)`;
      }

      if (secondArrowRef.current) {
        const secondArrow = secondArrowRef.current as HTMLElement;
        secondArrow.style.transform = `rotate(${seconds}deg)`;
      }

      setDigitalTime(getDigitalTime(location.timezone));
      setCalendar(getDateAndWeekDay(location));
    }, 1000);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [location]);

  return (
    <StyledWatchface>
      {hourMarks.map((item, idx, arr) => (
        <StyledHourMark
          style={{ transform: `rotate(${(360 / arr.length) * idx}deg)` }}
          key={idx}
        />
      ))}
      {minuteMarks.map((item, idx, arr) => (
        <StyledMinuteMark
          style={{ transform: `rotate(${(360 / arr.length) * idx}deg)` }}
          key={idx}
        />
      ))}
      <StyledCalendar>
        <span>{calendar?.weekday}</span>
        <span>{calendar?.date}</span>
      </StyledCalendar>
      <StyledHourArrow ref={hourArrowRef} />
      <StyledMinuteArrow ref={minuteArrowRef} />
      <StyledSecondArrow ref={secondArrowRef} />
      <StyledDigitalTime>{digitalTime}</StyledDigitalTime>
    </StyledWatchface>
  );
};

const StyledWatchface = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  margin: 0 auto;
  border: 0.5rem solid ${propFromTheme("borderPrimaryColor")};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${propFromTheme("backgroundSecondaryColor")};
  box-shadow: inset 1rem 1em 1.5rem 0 ${propFromTheme("shadowDarkenColor")},
    inset -1rem -1em 1.5rem 0 ${propFromTheme("shadowLightenColor")},
    1rem 1em 1.5rem 0 ${propFromTheme("shadowDarkenColor")};

  &:after {
    position: absolute;
    display: block;
    content: " ";
    top: 50%;
    left: 50%;
    width: 1.75%;
    height: 1.75%;
    transform: translate(-50%, -50%);
    background-color: ${propFromTheme("borderPrimaryColor")};
    border-radius: 50%;
  }
`;

const StyledHourMark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    position: absolute;
    top: 3%;
    left: 50%;
    display: block;
    content: " ";
    width: 0.5%;
    height: 5%;
    background-color: ${propFromTheme("borderPrimaryColor")};
    transform: translateX(-50%);
  }
`;

const StyledMinuteMark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    position: absolute;
    top: 3%;
    left: 50%;
    display: block;
    content: " ";
    width: 0.125%;
    height: 1%;
    background-color: ${propFromTheme("borderPrimaryColor")};
    opacity: 0.5;
    transform: translateX(-50%);
  }
`;

const StyledCalendar = styled.div`
  position: absolute;
  top: 50%;
  right: 20%;
  text-transform: uppercase;
  transform: translate(0, -50%);
  border: 2px solid ${propFromTheme("borderPrimaryColor")};
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 1.25rem;
  font-family: "Roboto";
  font-weight: 300;
  box-shadow: inset 2px 2px 4px 0 rgba(0, 0, 0, 0.25);

  @media screen and (max-width: ${SCREEN_WIDTH.LARGE}px) {
    font-size: 1.25rem;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.MEDIUM}px) {
    font-size: 0.7rem;
    right: 15%;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.SMALL}px) {
    font-size: 0.95rem;
    right: 20%;
  }

  @media screen and (max-width: ${SCREEN_WIDTH.XSMALL}px) {
    font-size: 0.8rem;
  }

  &:before,
  &:after {
    position: absolute;
    display: block;
    content: " ";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &:before {
    box-shadow: inset 0 5px 5px 0 rgba(0, 0, 0, 0.25);
  }

  &:after {
    box-shadow: inset 0 -5px 5px 0 rgba(0, 0, 0, 0.1);
  }

  & span {
    display: inline-block;
    padding: 0 4px;
    border-right: 2px solid ${propFromTheme("borderPrimaryColor")};
  }

  & span:last-of-type {
    background-color: #444;
    color: #fff;
    border-right: none;
  }
`;

const StyledHourArrow = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: " ";
    width: 1.75%;
    height: 25%;
    background-color: ${propFromTheme("borderPrimaryColor")};
  }
`;

const StyledMinuteArrow = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: " ";
    width: 0.75%;
    height: 35%;
    background-color: ${propFromTheme("borderPrimaryColor")};
  }
`;

const StyledSecondArrow = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

const StyledDigitalTime = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${propFromTheme("fontPrimaryColor")};
  font-size: 5rem;
  font-family: "Roboto";
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;
