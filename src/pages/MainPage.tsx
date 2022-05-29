import React, { useEffect, useState } from 'react';
import useQueryParamsToUpdateFilter from 'src/hooks/useQueryParamsToUpdateFilter';
import useDropDownData, { showAllLabelEnum } from 'src/hooks/useDropDownData';
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
import { DropDownItemProps } from 'src/components/DropDown/types';


export default function MainPaige() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(s => s as IRootState);
    const { createDropDownData } = useDropDownData();
    const { drawableData, mapSchoolToLessons, colors } = useConfigureData();
    const [schoolDDData, setSchoolDDData] = useState<DropDownItemProps[]>([]);
    const [schoolDDSelectedValue, setSchoolDDSelectedValue] = useState(state.dataStore.filter['school']);
    const { setSearchParams, activeSchools, setActiveSchools, getQueryParam } = useQueryParamsToUpdateFilter();


    console.log({
        aaaaaaaaaaaaaaaaaaaa: state.dataStore.data.filter(a => a.country === 'Kenya' && a.camp === 'Kakuma' && a.school === 'Greenlight')
        .reduce((ac, el) => ac + el.lessons, 0)
    });
    

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
            [name]: item.value !== showAllLabelEnum.SHOW_ALL ? item.value : '',
            ...(n !== 'school' && {school: ''}),
        };

        dispatch(updateFilter(updated));
        setSearchParams(
            {
                ...state.dataStore.filter,
                ...updated,
                activeSchools: activeSchools.join(','),
            },
            { replace: true }
        );
    }

    useEffect(() => {
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
        )
    },
    [
        state.dataStore.filter.country,
        state.dataStore.filter.camp
    ]);


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
                                navigate(`/details/${item.dataKey}/${camp}/${country}/${item.payload.month}`);
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
                                    school: "all schools",
                                    lessons: mapSchoolToLessons.reduce((ac, el) => ac + (el.lessons || 0), 0)
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
                                            setActiveSchools(
                                                activeSchools.includes(item.school as string)
                                                    ? activeSchools.filter(a => a !== item.school)
                                                    : [...activeSchools, item.school as string]
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
