import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {DropDown} from './index';
import React from 'react';
import { DropDownItemProps } from './types';
import userEvent from "@testing-library/user-event";



describe('test drop down', () => {
  const items: DropDownItemProps[] = Array(5)
  .fill({}).map((e, i) => ({id: i, value: `value-${i}`}));

  const selectedValue = items[2].value;
  const { container } = render(<DropDown items={items} />);


  test("should have value from array", async() => {
    const linkElement = await screen.getByText(selectedValue);
    expect(linkElement).toBeInTheDocument();
  });
});
