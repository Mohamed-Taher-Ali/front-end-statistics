import React, { cloneElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IData } from 'src/config/types';
import { IRootState } from 'src/store/types';
import { ListItemProps } from './types';
 

export function ListItem<T extends Partial<IData>> ({
  color = '',
  data,
  onClick,
  icon
}: ListItemProps<T>) {
  const [Icon, setIcon] = useState(icon);
  const state = useSelector(s => s as IRootState);
  const clr = color || state.colorMode.currentMode.fontColor;

  useEffect(()=>{
    if(!icon) return;

      setIcon(
        cloneElement(
          icon,
          {
            color: clr
          }
        )
      )
  }, [clr, icon]);

  const onClickHandler = (item: T) => {
    onClick && onClick(item);
  }

    return (
      <div
      className='list-item-cont'
      onClick={() => onClickHandler(data)}
      style={{
        color: clr,
        cursor: onClick ? 'pointer': 'auto'
      }}
      >
      {
        Icon &&
        <div className='list-item-left-cont'>{Icon}</div>
      }
      <div>
          <div>
              <span className='list-item-num'>{data.lessons}</span>
              <span className='list-item-lessons'>Lessons</span>
          </div>
          <div className='list-item-school'>in {data.school}</div>
      </div>
  </div>
    )
}