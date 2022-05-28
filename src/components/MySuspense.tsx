import React, { Suspense } from 'react';
import { IRootState } from 'src/store/types';
import { useSelector } from 'react-redux';
import { RequiredChildrenProps } from 'src/config/types';
import { LoadingIndicator } from 'src/components/LoadingIndicator';


export function MySuspense({children}: RequiredChildrenProps){
    const state = useSelector(s => s as IRootState);

    return (
        <Suspense
        fallback={
            <LoadingIndicator
                color={state.colorMode.currentMode.mainColor}
                type='balls'
            />
        }
    >{children}</Suspense>
    )
}