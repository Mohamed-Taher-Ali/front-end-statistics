import React, { useEffect, useState } from 'react';
import useQueryParamsToUpdateFilter from 'src/hooks/useQueryParamsToUpdateFilter';
import useDropDownData, { showAllLabelEnum } from 'src/hooks/useDropDownData';
import { DropDownItemProps } from 'src/components/DropDown/types';
import useConfigureData from 'src/hooks/useConfigureData';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'src/store/slices/data';
import { ListItem } from 'src/components/ListItem';
import { DropDown } from 'src/components/DropDown';
import { useNavigate } from 'react-router-dom';
import { Bullet } from 'src/components/Bullet';
import { IDataFilter } from 'src/config/types';
import MyChart from 'src/components/MyChart';
import { IRootState } from 'src/store/types';


export default function MainPaige() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(s => s as IRootState);
    const { createDropDownData } = useDropDownData();
    const [schoolDDSelectedValue, setSchoolDDSelectedValue] = useState('');
    const { drawableData, mapSchoolToLessons, colors } = useConfigureData();
    const [schoolDDData, setSchoolDDData] = useState<DropDownItemProps[]>([]);
    const { setSearchParams, activeSchools, setActiveSchools, getQueryParam } = useQueryParamsToUpdateFilter();


    const applyItemToDropDownList = (
        key: keyof IDataFilter,
        showAllLabel?: showAllLabelEnum
    ) => ({
        titleColor: state.colorMode.currentMode.fontColor,
        items: createDropDownData(key, showAllLabel),
        selectedValue: state.dataStore.filter[key],
        title: `select ${key}`,
        name: key,
    });

    const onSelectDD = (name: string, item: DropDownItemProps) => {
        const n = name as keyof IDataFilter;

        const updated = {
            ...state.dataStore.filter,
            [name]: item.value !== showAllLabelEnum.SHOW_ALL ? item.value : '',
            ...(n !== 'school' && { school: '' }),
        };

        setActiveSchools([]);
        dispatch(updateFilter(updated));
        setSearchParams(
            { ...updated, activeSchools: '' },
            { replace: true }
        );
    }

    useEffect(
        () => {
            setSchoolDDData(
                createDropDownData(
                    'school',
                    showAllLabelEnum.SHOW_ALL
                )
            );

            setSchoolDDSelectedValue(
                getQueryParam('school') ||
                state.dataStore.filter.school ||
                showAllLabelEnum.SHOW_ALL
            );
        },// eslint-disable-next-line
        [
            state.dataStore.filter.country,
            state.dataStore.filter.camp
        ]
    );


    return (
        <div className='page-cont'>
            <div className='main-page-data'>
                <div>
                    <DropDown.List
                        dropDowns={[
                            applyItemToDropDownList('country'),
                            applyItemToDropDownList('camp'),
                            {
                                titleColor: state.colorMode.currentMode.fontColor,
                                onSelect: (item) => onSelectDD('school', item),
                                selectedValue: schoolDDSelectedValue,
                                title: `select ${'school'}`,
                                items: schoolDDData,
                                name: 'school',
                            }
                        ]}

                        titleColor={state.colorMode.currentMode.fontColor}
                        onSelect={(name: string, item) => {
                            setSchoolDDSelectedValue(item.value);
                            onSelectDD(name, item)
                        }}
                    />
                </div>
                <div
                    className='main-page-bottom'
                    style={{
                        backgroundColor: state.colorMode.currentMode.secondaryColor
                    }}
                >
                    <div className='main-page-chart-cont'>
                        <MyChart
                            colors={colors}
                            drawableData={drawableData}
                            schools={mapSchoolToLessons}
                            activeSchools={activeSchools}
                            onPointClick={(item) => {
                                const { camp, country } = state.dataStore.filter;
                                if (!(item.dataKey && camp && country && item.payload.month)) return;

                                const id = state.dataStore.data.find(d =>
                                    d.month === item.payload.month &&
                                    d.school === item.dataKey &&
                                    d.country === country &&
                                    d.camp === camp
                                )?.id;

                                navigate(`/details/${id}`);
                            }}
                        />
                    </div>
                    <div
                        className='main-page-list-cont'
                        style={{
                            borderLeft: `1px solid ${state.colorMode.currentMode.fontColor}`
                        }}
                    >
                        <div>
                            <ListItem
                                data={{
                                    school: state.dataStore.filter.camp,
                                    lessons: state.dataStore.data.filter(d =>
                                        d.camp === state.dataStore.filter.camp &&
                                        d.country === state.dataStore.filter.country
                                    ).reduce((ac, el) => ac + (el.lessons || 0), 0),
                                }}
                            />
                        </div>
                        <div className='main-page-list'>
                            {
                                mapSchoolToLessons.map((data, ind) => (
                                    <ListItem
                                        key={ind}
                                        data={data}
                                        icon={
                                            <Bullet
                                                color={
                                                    activeSchools.includes(data?.school as string)
                                                        ? colors[ind]
                                                        : undefined
                                                }
                                            />
                                        }
                                        color={
                                            activeSchools.includes(data.school as string)
                                                ? colors[ind]
                                                : undefined
                                        }
                                        onClick={(item) => {
                                            const updated = {
                                                activeSchools: activeSchools.includes(item.school as string)
                                                    ? activeSchools.filter(a => a !== item.school)
                                                    : [...activeSchools, item.school as string]
                                            };
                                            setActiveSchools(updated.activeSchools);

                                            setSearchParams(
                                                {
                                                    ...state.dataStore.filter,
                                                    ...updated,
                                                    activeSchools: updated.activeSchools.join(','),
                                                },
                                                { replace: true }
                                            );
                                        }}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
