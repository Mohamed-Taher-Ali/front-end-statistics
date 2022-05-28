import React from "react";

export interface ILessonInfo {
    id: number;
    num: number;
    schoolName: string;
}

interface IMouseEvent extends React.MouseEvent<SVGCircleElement, globalThis.MouseEvent> {
    dataKey: string;
    fill: string;
}

export interface IPointReturn<T> extends IMouseEvent {
    payload: T;
}

export interface MyChartProps<T, T2> {
    onPointClick?: (item: IPointReturn<T>) => void;
    activeSchools?: string[],
    drawableData: T[];
    colors: string[];
    schools: T2[];
}

export interface CustomTooltipProps<T>{ 
    payload?: {payload: T}[],
    active?: boolean,
    label?: string,
    point: T
}

export type MyChartCallbackTypes = 'move' | 'out' | 'click';