import React from 'react';
import { useSelector } from 'react-redux';
import { IData } from 'src/config/types';
import { IRootState } from 'src/store/types';


export function DataDisp(data: IData) {
  const state = useSelector(s => s as IRootState);

  return (
    <div
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
    </div>
  )
}