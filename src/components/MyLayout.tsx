import React, { useEffect } from 'react';
import { IRootDispatch, IRootState } from 'src/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { MySuspense } from './MySuspense';
import { LightDarkMode } from './LightDarkMode';
import { fetchData } from 'src/store/slices/data';


export default function MyLayout() {
    const state = useSelector(s => s as IRootState);
    const dispatch = useDispatch<IRootDispatch>();
    
    useEffect(()=>{ dispatch(fetchData()) }, []);

    return (
        <MySuspense>
            <div
            className='layout'
            style={{backgroundColor: state.colorMode.currentMode.backColor}}
            >
                <div className='header-btn'>
                    <LightDarkMode />
                </div>
                <Outlet />
            </div>
        </MySuspense>
    );
}