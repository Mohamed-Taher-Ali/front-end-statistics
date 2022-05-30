import React from 'react';
import { IMonthlyLessonsCount } from 'src/config/types';
import { CustomTooltipProps, IPointReturn } from './types';

export const CustomTooltip = ({ 
    active,
    payload,
    point,
}: CustomTooltipProps<IPointReturn<IMonthlyLessonsCount>>) => {
    if (!(active && payload && payload.length && point)) return <div></div>;

    const {payload: p} = payload[0];
    const sum = Object.values(p).reduce((ac, el) => ac + (isNaN(el)?0:el), 0)

    const lessonsNum = point.payload
        ? +point.payload[point.dataKey as keyof IMonthlyLessonsCount]
        : 0;

    return (
        <div className="tooltip">
            <div className='tooltip-1st-row'>
                <div className='tooltip-school'>{point.dataKey}</div>
                <div className='tooltip-dot' style={{ backgroundColor: point.fill }}></div>
            </div>
            <div className='tooltip-lessons-num'>{lessonsNum} lessons {Math.floor((lessonsNum/sum)*100)}%</div>
        </div>
    );
}