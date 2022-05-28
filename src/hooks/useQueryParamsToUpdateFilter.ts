import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { updateFilter } from 'src/store/slices/data';
import { IRootState } from 'src/store/types';


export default function useQueryParamsToUpdateFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeSchools, setActiveSchools] = useState<string[]>([]);
    const state = useSelector(s => s as IRootState)
    const dispatch = useDispatch();
    
    useEffect(() => { 
        const params = new URLSearchParams(window.location.search);

        const activeSchools = params.get('activeSchools')?.split(',') || [];
        const country = params.get('country') || '';
        const school = params.get('school') || '';
        const camp = params.get('camp') || '';

        dispatch(updateFilter({ camp, country, school }));
        setActiveSchools(activeSchools);
     }, []);

     useEffect(()=>{
         if(!activeSchools.length) return;
         console.log(activeSchools);
         
         setSearchParams({
            ...state.dataStore.filter,
            activeSchools: `${activeSchools.join(',')}`
         })
     }, [activeSchools])

     return { setSearchParams, activeSchools, setActiveSchools };
}