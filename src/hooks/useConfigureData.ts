import { IData, IMapStringNumber, IMonthlyLessonsCount } from 'src/config/types';
import { generateUniqueColors, getArrangedMonths } from 'src/config/helpers';
import { useCallback, useEffect, useState } from 'react';
import { IDataState, IRootState } from 'src/store/types';
import { useSelector } from 'react-redux';


export default function useConfigureData() {
    const dataStore = useSelector(s => s as IRootState).dataStore;
    const { filter: { camp, country, school }, data } = dataStore;

    const [activeSchools, setActiveSchools] = useState([]);
    const [drawableData, setDrawableData] = useState<IMonthlyLessonsCount[]>([]);
    const [colors, setColors] = useState(generateUniqueColors(data?.length || 0));
    const [mapSchoolToLessons, setMapSchoolToLessons] = useState<Partial<IData>[]>([]);

    const generateChartData = useCallback(() => {
        if (!data) return;
        
        const {
            schoolLessonsArr,
            monthlyLessonsArr,
        } = manipulateChartData({
            filter: dataStore.filter,
            activeSchools,
            data,
        });

        setMapSchoolToLessons(schoolLessonsArr);
        setDrawableData(monthlyLessonsArr);
        // eslint-disable-next-line
    }, [data, camp, country, school]);

    useEffect(() => { 
        generateChartData();
        // eslint-disable-next-line
    }, [data, camp, country, school]);
    useEffect(() => { setColors(generateUniqueColors(data.length)); }, [data, country, camp]);

    return {
        colors,
        drawableData,
        mapSchoolToLessons,
        setActiveSchools,
    };
}


const accumulateLessonsToMonth = (
    mapMonth2SchoolsLessons: Record<string, { [key: string]: number }>,
    item: IData,
) => {
    const school = item.school as keyof IData;

    if (mapMonth2SchoolsLessons[item.month][school])
        mapMonth2SchoolsLessons[item.month][school] += item.lessons;
    else mapMonth2SchoolsLessons[item.month][school] = item.lessons;
}


const accumulateLessonsToSchool = (
    mapSchool2Lessons: Record<string, number>,
    item: IData,
) => {
    if (mapSchool2Lessons[item.school])
        mapSchool2Lessons[item.school] += item.lessons;
    else mapSchool2Lessons[item.school] = item.lessons;
}


const filterDataWithAccumulateLessons = ({
    mapMonth2SchoolsLessons,
    mapSchool2Lessons,
    filter,
    data,
}: {
    mapMonth2SchoolsLessons: Record<string, IMapStringNumber>,
    mapSchool2Lessons: Record<string, number>,
} & IDataState) => {
    const { camp, country, school } = filter;
    const allUsedSchools: Record<string, number> = {};

    data.map(item => {
        if (
            (camp ? item.camp === camp : true) &&
            (school ? item.school === school : true) &&
            (country ? item.country === country : true)
        ) {
            accumulateLessonsToMonth(mapMonth2SchoolsLessons, item);
            accumulateLessonsToSchool(mapSchool2Lessons, item);
            allUsedSchools[item.school] = 0;
        }
    });

    return allUsedSchools;
}


const manipulateChartData = ({
    data, filter, activeSchools
}: IDataState & { activeSchools: string[] }) => {
    const schoolLessonsArr: (Partial<IData> & { isActive: boolean })[] = [];
    let monthlyLessonsArr: IMonthlyLessonsCount[] = [];

    const mapSchool2Lessons: Record<string, number> = {};
    const mapMonth2SchoolsLessons: Record<string, IMapStringNumber> =
        getArrangedMonths().reduce((acc, m) => ({ ...acc, [m]: {} }), {});

    const allUsedSchools = filterDataWithAccumulateLessons({
        mapMonth2SchoolsLessons,
        mapSchool2Lessons,
        filter,
        data,
    });


    monthlyLessonsArr = getArrangedMonths().map(month => ({
        month, ...allUsedSchools, ...mapMonth2SchoolsLessons[month]
    }));

    for (const [school, lessons] of Object.entries(mapSchool2Lessons))
        schoolLessonsArr.push({
            isActive: !!activeSchools?.includes(school),
            lessons,
            school,
        });

    return {
        monthlyLessonsArr,
        schoolLessonsArr,
    };
}