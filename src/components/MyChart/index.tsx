import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/types';
import { CustomTooltip } from './CustomTooltip';
import { IData, IMonthlyLessonsCount } from 'src/config/types';
import { IPointReturn, MyChartCallbackTypes, MyChartProps } from './types';
import { CartesianGrid, Line, LineChart, Tooltip, DotProps, XAxis, YAxis } from 'recharts';


export default function MyChart({
    onPointClick,
    drawableData,
    activeSchools = [],
    schools,
    colors,
}: MyChartProps<IMonthlyLessonsCount, Partial<IData>>) {
    const state = useSelector(s => s as IRootState);
    const [hoveredPoint, setHoveredPoint] =
        useState<Partial<IPointReturn<IMonthlyLessonsCount>>>({});

    const onMouseEvent =
        (type: MyChartCallbackTypes) =>
            (p: DotProps, e: IPointReturn<IMonthlyLessonsCount>) => {
                if (type === 'click' && onPointClick) onPointClick(e);
                else if (type === 'move') setHoveredPoint(e);
                else if (type === 'out') setHoveredPoint({});
            }

    const duplicatedEvents = {
        onMouseOut: onMouseEvent('out'),
        onMouseOver: onMouseEvent('move'),
    }

    return (
        <LineChart
            width={900}
            height={500}
            data={drawableData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            style={{ backgroundColor: state.colorMode.currentMode.secondaryColor }}
        >

            <YAxis
            type="number"
            yAxisId="left"
            stroke='transparent'
            domain={[0, 'auto']}
            interval="preserveStartEnd"
            tickLine={{ stroke: 'transparent' }}
            tick={{ fill: state.colorMode.currentMode.fontColor }}
            />

            <XAxis dataKey="month" stroke={state.colorMode.currentMode.fontColor} />
            <CartesianGrid vertical={false} stroke={state.colorMode.currentMode.fontColor} />
            <Tooltip
            active={true}
                wrapperStyle={{ display: Object.keys(hoveredPoint).length ? 'block' : 'none', color: 'red' }}
                content={<CustomTooltip point={hoveredPoint as IPointReturn<IMonthlyLessonsCount>} />}
            />
            {
                schools.map((item, ind) => {
                    return (
                        <Line
                            key={ind}
                            dot={{ r: 5, ...duplicatedEvents }}
                            activeDot={{
                                onClick: onMouseEvent('click'),
                                ...duplicatedEvents,
                                strokeWidth: hoveredPoint.dataKey !== item.school ? 4 : 0,
                            }}
                            display={activeSchools.includes(item.school as string) ? 'block' : 'none'}
                            yAxisId="left"
                            strokeWidth={3}
                            type="monotone"
                            stroke={colors[ind]}
                            dataKey={item.school}
                        />
                    );
                })
            }
        </LineChart>
    );
}