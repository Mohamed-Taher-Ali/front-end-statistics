import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'src/store/slices/data';
import { useSearchParams } from 'react-router-dom';
import { IRootState } from 'src/store/types';


export default function useQueryParamsToUpdateFilter() {
    // const [searchParams, setSearchParams] = useSearchParams();
    const setSearchParams = useSearchParams()[1];
    const params = new URLSearchParams(window.location.search);
    const [activeSchools, setActiveSchools] = useState<string[]>([]);
    const state = useSelector(s => s as IRootState)
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        const activeSchoolsParam = params.get('activeSchools')?.split(',') || [];
        const country = params.get('country') || state.dataStore.filter.country || '';
        const school = params.get('school') || state.dataStore.filter.school || '';
        const camp = params.get('camp') || state.dataStore.filter.camp || '';

        dispatch(updateFilter({ camp, country, school }));
        setActiveSchools(activeSchoolsParam);
    }, []);


    useEffect(() => {
        if (!activeSchools.length) return;

        setSearchParams({
            ...state.dataStore.filter,
            activeSchools: `${activeSchools.join(',')}`
        })
    }, [activeSchools])


    const getQueryParam = (param: string) => {
        return params.get(param) || '';
    }
    

    return { setSearchParams, activeSchools, setActiveSchools, getQueryParam };
}