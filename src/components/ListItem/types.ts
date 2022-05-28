import { ReactElement } from "react";

export interface ILessonInfo {
    id: number;
    num: number;
    schoolName: string;
}

export interface IListItemData<T> {
    data: T;
}

export interface ListItemProps<T> extends IListItemData<T> {
    icon?: ReactElement<{color: string;}>;
    onClick?: (item: T) => void;
    color?: string;
}