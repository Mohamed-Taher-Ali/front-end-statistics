import React from 'react';
import { useSelector } from 'react-redux';
import { IData } from 'src/config/types';
import { IRootState } from 'src/store/types';
import { useParams } from 'react-router-dom';

export default function DetailsPage() {
    const { school, month, camp, country } = useParams();
    const state = useSelector(s => s as IRootState);

    const data = state.dataStore.data.find(d =>
        d.country === country &&
        d.school === school &&
        d.month === month &&
        d.camp === camp
    );

    return (
        <div className='page-cont'>
            {
                !data
                    ? (<div>no data</div>)
                    : (<div
                        key={data.id}
                        className='details-out-box'
                        style={{
                            backgroundColor: state.colorMode.currentMode.secondaryColor,
                            color: state.colorMode.currentMode.fontColor
                        }}
                    >
                        {
                            Object.keys(data).map(dd => (
                                <div key={dd} className='details-inner-box'>
                                    <div>{dd}</div>
                                    <div>{data[dd as keyof IData]}</div>
                                </div>
                            ))
                        }
                    </div>)
            }
        </div>
    )
}