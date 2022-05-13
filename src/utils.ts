import { RefObject } from "react";
import { API_HOST } from "./config";
import { ILocation, ITheme, TTimeParts } from "./types";

export const noop = (): void => {};

export const propFromTheme =
  (propName: keyof ITheme) =>
  ({ theme }: { theme: ITheme }): string | undefined =>
    theme[propName];

export const getHoursMinutesSeconds = (timeZone: string): TTimeParts => {
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

  return formattedTime.split(":").map((i) => parseInt(i)) as TTimeParts;
};

export const getArrowDegrees = (
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

export const getDigitalTime = (timeZone: string): string => {
  return Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());
};

export const getDateAndWeekDay = (
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

export const getRotationDegreeFromElementStyle = (
  element: HTMLElement
): number => {
  const transformValue = element.style.transform;
  const degree = `${(transformValue.match(/^rotate\((.+)deg\)/) || [0]).pop()}`;
  return degree ? parseFloat(degree) : 0;
};

export const rotateRefElement = (
  ref: RefObject<HTMLElement>,
  degree: number
): void => {
  if (ref.current) {
    const element = ref.current as HTMLElement;
    const currentDegree: number = getRotationDegreeFromElementStyle(element);
    const safeDegree =
      currentDegree + ((degree ? degree % 360 : 360) - (currentDegree % 360));

    element.style.transform = `rotate(${safeDegree}deg)`;
  } else {
    console.error("No Ref Element!");
  }
};

export const requestLocations = (location: string): Promise<ILocation> => {
  const url = `${API_HOST}${location}`;

  return fetch(url).then((response: Response): Promise<ILocation> => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const getLocationsFromQueryString = (): string[] => {
  const { locations } = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );

  if (locations) {
    return locations.split(",").map((l) => decodeURIComponent(l.trim()));
  }

  return [];
};
