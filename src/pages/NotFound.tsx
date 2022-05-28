import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/types';

export default function NotFoundPage() {
    const state = useSelector(s => s as IRootState);
    return (
        <div className='page-cont'>
            <div
                style={{
                    fontSize: '30px',
                    color: state.colorMode.currentMode.fontColor
                }}
            >Oooops Not Found !</div>
        </div>
    )
}