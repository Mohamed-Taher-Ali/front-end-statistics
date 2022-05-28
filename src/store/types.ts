import { IData, IDataFilter } from "src/config/types";
import { store } from ".";

export interface IColorMode {
  secondaryColor: string;
  mode: ColorModeType;
  mainColor: string;
  backColor: string;
  fontColor: string;
}

export interface IColorModeState {
  currentMode: IColorMode;
}

export type ColorModeType = 'light' | 'dark';

export interface IDataState {
  filter: IDataFilter;
  data: IData[];
}

export type IRootState = ReturnType<typeof store.getState>;
export type IRootDispatch = typeof store.dispatch;