import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bullet } from 'src/components/Bullet';
import { DropDown } from 'src/components/DropDown';
import { ListItem } from 'src/components/ListItem';
import MyChart from 'src/components/MyChart';
import { IDataFilter } from 'src/config/types';
import useConfigureData from 'src/hooks/useConfigureData';
import useDropDownData from 'src/hooks/useDropDownData';
import useQueryParamsToUpdateFilter from 'src/hooks/useQueryParamsToUpdateFilter';
import { updateFilter } from 'src/store/slices/data';
import { IRootState } from 'src/store/types';


export default function MainPaige() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(s => s as IRootState);
    const { createDropDownData } = useDropDownData();
    const { setSearchParams, activeSchools, setActiveSchools } = useQueryParamsToUpdateFilter();
    const { drawableData, mapSchoolToLessons, colors } = useConfigureData();

    
    const applyItemToDropDownList = (key : keyof IDataFilter) => ({
        titleColor: state.colorMode.currentMode.fontColor,
        selectedValue: state.dataStore.filter[key],
        items: createDropDownData(key),
        title: `select ${key}`,
        name: key,
    });


    return (
        <div className='page-cont'>
            <div className='main-page-data'>
                <div>
                    <DropDown.List
                        dropDowns={[
                            applyItemToDropDownList('country'),
                            applyItemToDropDownList('camp'),
                            applyItemToDropDownList('school'),
                        ]}
                        titleColor={state.colorMode.currentMode.fontColor}
                        onSelect={(name: string, item) => {
                            const updated = { [name]: item.id ? item.value : '', };
                            dispatch(updateFilter(updated));
                            setSearchParams(
                                { 
                                ...state.dataStore.filter,
                                activeSchools: activeSchools.join(','),
                                ...updated
                            }, 
                                { replace: true }
                                );
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
                                navigate(`/details/${item.dataKey}/${item.payload.month}`);
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
