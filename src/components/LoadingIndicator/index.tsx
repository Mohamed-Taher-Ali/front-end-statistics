import React from 'react';
import ReactLoading from 'react-loading';
import { LoadingIndicatorProps } from './types';
 
export function LoadingIndicator ({ 
    type,
    color,
    fontColor,
    backgroundColor,
}: LoadingIndicatorProps) {

    return (
        <div className='ind-cont'>
          <div className='ind-inner-cont' style={{backgroundColor}}>
            <div className='please-wait' style={{color: fontColor}}>Please Wait </div>
            <ReactLoading
              className='ind'
              color={color}
              height={'5%'}
              width={'5%'}
              type={type}
            />
          </div>
        </div>
    )
}