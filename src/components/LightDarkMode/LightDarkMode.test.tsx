import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { LightDarkMode } from './index';
import { MyStore } from 'src/store/Provider';
import userEvent from "@testing-library/user-event";


describe('test light/dark mode button', () => {
  const modesLabel = {
    moveToLight: 'Light mode',
    moveToDark: 'Dark mode',
  };

  test("test the forward color is dark", async () => {
    render(
      <MyStore>
        <LightDarkMode />
      </MyStore>
    );

    const btn = await screen.findByText(modesLabel.moveToDark);
    expect(btn).toBeInTheDocument();
  });

  
  test("after click moveToDark shouldn't be in doc", async() => {
    render(
      <MyStore>
        <LightDarkMode />
      </MyStore>
    );

    const btnBeforeClick = await screen.findByText(modesLabel.moveToDark);
    userEvent.click(btnBeforeClick);

    const btnAfterClick = await screen.findByText(modesLabel.moveToLight);
    expect(btnAfterClick).toBeInTheDocument();
  });

});