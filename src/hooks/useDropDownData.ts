import { IDataFilter } from 'src/config/types';
import { IRootState } from 'src/store/types';
import { useSelector } from 'react-redux';

export enum showAllLabelEnum {
    SHOW_ALL = 'show all',
    NONE = 'none'
}

export default function useDropDownData() {
    const { dataStore: { filter, data } } = useSelector(s => s as IRootState);

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

        return ret.map((value, id) => ({ id, value }))
    }

    return { createDropDownData };
}