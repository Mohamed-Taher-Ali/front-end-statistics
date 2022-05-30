import { ReactElement } from "react";

export interface RequiredChildrenProps {
    children: ReactElement;
}

export interface OptionalChildrenProps {
    children?: ReactElement;
}

export interface IDataFilterableBase<T> {
    camp: T;
    school:  T;
    country: T;
}

type IDataFilterable = IDataFilterableBase<string>;

export interface IData extends IDataFilterable {
    id: string;
    month: string;
    lessons: number;
}

export type IDataFilter = Partial<IDataFilterable>

export interface IMonthlyLessonsCount {
    [key: string]: number | string;
    month: string;
}

export type IMapStringNumber = Record<string, number>;

export type Full<T> = {
    [P in keyof T]-?: T[P];
}

