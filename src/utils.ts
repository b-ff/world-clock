import { ITheme } from "./types";

export const noop = (): void => {};

export const propFromTheme =
  (propName: keyof ITheme) =>
  ({ theme }: { theme: ITheme }): string | undefined =>
    theme[propName];
