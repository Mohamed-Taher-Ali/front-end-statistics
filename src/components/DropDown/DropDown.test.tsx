import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {DropDown} from './index';
import React from 'react';
import { DropDownItemProps } from './types';
import userEvent from "@testing-library/user-event";



describe('test drop down', () => {
  const items: DropDownItemProps[] = Array(5)
  .fill({}).map((e, i) => ({id: i, value: `value-${i}`}));

  const ind = 2;
  const getSelectedValue = (ind: number) => items[ind].value;

  test("should have value from array", async() => {
    render(<DropDown items={items} selectedValue={getSelectedValue(ind)} />);
    const linkElement = await screen.getByText(getSelectedValue(ind));
    
    expect(linkElement).toBeInTheDocument();
  });

  test("should have value from array", async() => {
    const { container } = render(
      <DropDown
        items={items}
        selectedValue={getSelectedValue(ind)}
      />
    );
    const select = container.getElementsByTagName('select')[0];
    
    expect(select.selectedIndex).toBe(ind);
  });

  test("should get correct item on select", async() => {
    const newInd = 4;
    const { container } = render(
      <DropDown
        items={items}
        selectedValue={getSelectedValue(ind)}
        onSelect={(item)=>{
          expect(item.id).toBe(newInd);
          expect(item.value).toBe(getSelectedValue(newInd));
        }}
      />
    );
    
    const select = await container.getElementsByTagName('select')[0];
    userEvent.selectOptions(select, [getSelectedValue(newInd)], { bubbles: true });
  });

});
