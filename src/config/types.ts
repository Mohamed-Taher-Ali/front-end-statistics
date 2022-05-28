import { ReactElement } from "react";

export interface RequiredChildrenProps {
    children: ReactElement;
}

export interface OptionalChildrenProps {
    children?: ReactElement;
}

interface IDataFilterable {
    camp: string;
    school:  string;
    country: string;
}

export interface IData extends IDataFilterable {
    id: string;
    month: string;
    lessons: number;
}

export interface IDataFilter extends Partial<IDataFilterable> {
}

export interface IMonthlyLessonsCount {
    [key: string]: number | string;
    month: string;
}

export type IMapStringNumber = Record<string, number>;

type Full<T> = {
    [P in keyof T]-?: T[P];
}

