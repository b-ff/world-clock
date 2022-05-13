import { DARK_THEME_KEY, LIGHT_THEME_KEY } from "./config";

export interface ILocation {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  pop: number;
  country: string;
  iso2: string;
  iso3: string;
  province: string;
  timezone: string;
  isDST: boolean;
  utcOffset: number;
}

export interface ITheme {
  backgroundPrimaryColor: string;
  backgroundSecondaryColor: string;
  fontPrimaryColor: string;
  fontSecondaryColor: string;
  borderPrimaryColor: string;
  borderSecondaryColor: string;
  shadowLightenColor: string;
  shadowDarkenColor: string;
}
