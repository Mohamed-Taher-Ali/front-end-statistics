import { IDataFilter } from 'src/config/types';
import { IRootState } from 'src/store/types';
import { useSelector } from 'react-redux';


export default function useDropDownData() {
    const state = useSelector(s => s as IRootState);

    const createDropDownData = (key: keyof IDataFilter) => {
        let data = state.dataStore.data.map(d => d[key]);
        data = ['show all', ...new Set(data)];
        return data.map((value, id) => ({id, value}))
    }

    return {createDropDownData};
}