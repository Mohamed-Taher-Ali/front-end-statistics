import { IDataFilter } from 'src/config/types';
import { IRootState } from 'src/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'src/store/slices/data';

export enum showAllLabelEnum {
    SHOW_ALL = 'show all',
    NONE = 'none'
}

export default function useDropDownData() {
    const { dataStore: { filter, data } } = useSelector(s => s as IRootState);
    const dispatch = useDispatch();

    const createDropDownData = (
        key: keyof IDataFilter,
        showAllLabel: showAllLabelEnum = showAllLabelEnum.NONE
    ) => {
        const filteredData = data
            .filter(d => (
                key !== 'school'
                    ? true
                    :
                    d.country === filter.country &&
                    d.camp === filter.camp
            ))
            .map(d => d[key]);

        const ret = [...new Set(filteredData)];

        if (showAllLabel === showAllLabelEnum.SHOW_ALL) ret.unshift(showAllLabel);
        else if (!filter[key]) dispatch(updateFilter({ [key]: ret[0] }));

        return ret.map((value, id) => ({ id, value }))
    }

    return { createDropDownData };
}