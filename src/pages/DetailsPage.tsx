import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IData } from 'src/config/types';
import { IRootState } from 'src/store/types';

export default function DetailsPage() {
    const { school, month } = useParams();
    const state = useSelector(s => s as IRootState);
    const data = state.dataStore.data.filter(d => d.school === school && d.month === month);

    return (
        <div className='page-cont'>
            <div className='details-cont'>
                {
                    data.map(d => (
                        <div
                            key={d.id}
                            className='details-out-box'
                            style={{
                                backgroundColor: state.colorMode.currentMode.secondaryColor,
                                color: state.colorMode.currentMode.fontColor
                            }}
                        >
                            {
                                Object.keys(d).map(dd => (
                                    <div key={dd} className='details-inner-box'>
                                        <div>{dd}</div>
                                        <div>{d[dd as keyof IData]}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}