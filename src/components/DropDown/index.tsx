import React, { useEffect, useState } from 'react';
import { DropDownProps, DropDownItemProps, DropDownsListProps } from './types';

export function DropDown<T extends DropDownItemProps>({ 
  items,
  title,
  onSelect,
  selectedValue,
  titleColor,
}: DropDownProps<T>) {
  const [value, setValue] = useState(
    items.find(i=>i.value === selectedValue)?.value
  );

  const onClickHandler = (val: string) => {
    const item = items.find(i => i.value === val);
    onSelect && item && onSelect(item);
  }

  useEffect(()=> {
    setValue(
      items.find(i=>i.value === selectedValue)?.value
    )
  }, [selectedValue])

  return (
    <div className='drop-down-cont'>
      {
        title &&
        <span
        className='drop-down-option'
        style={{color: titleColor}}
        >{title}</span>
      }
      <select
        className='drop-down'
        {...{...(value? { value }: {})}}
        onChange={(e)=> onClickHandler(e.target.value)}
      >
        {
          items.map(item => (
            <option
              key={item.id}
              >{item.value}</option>
          ))
        }
      </select>
    </div>
  );
}


DropDown.List = function DropDownList<T extends DropDownItemProps>({
  titleColor,
  dropDowns,
  onSelect
}: DropDownsListProps<T>) {

  const onSelectHandler = (name: string, item: T) => {
    onSelect && onSelect(name, item);
  }

  return(
    <div className='drop-downs-list'>
      {
        dropDowns?.map((dropDown, ind) =>(
          <DropDown
            key={ind}
            title={dropDown.title}
            items={dropDown.items}
            titleColor={titleColor}
            selectedValue={dropDown.selectedValue}
            onSelect={(item)=> onSelectHandler(dropDown.name, item)}
          />
        ))
      }
    </div>
  )
}
