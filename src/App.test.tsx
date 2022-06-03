import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import App from './App';
import { getData } from './services/apiGetData';
import userEvent from '@testing-library/user-event';
import { IData } from './config/types';
import { act } from 'react-dom/test-utils';

describe('test app', () => {

  test("integration test between 3 selects boxes should get correct school option", async () => {
    const ind = 0;
    const { data } = (await getData()) as { data: IData[] };

    await act(async () => {
      render(<App />);

      //used timeout instead of wait for because wait for return strange error although data came successfully
      setTimeout(async () => {
        const selects = await screen.getAllByText('drop-down');

        const countrySelect = selects[0];
        const campSelect = selects[1];
        const schoolSelect = selects[2];

        userEvent.selectOptions(countrySelect, [data[ind].country], { bubbles: true });
        userEvent.selectOptions(campSelect, [data[ind].camp], { bubbles: true });

        const resArr = data.filter(d => d.country === data[ind].country && d.camp === data[ind].camp);

        const schoolInd = 2;
        userEvent.selectOptions(schoolSelect, [resArr[schoolInd].school], { bubbles: true });

        const selectedSchoolValue = await screen.getByText(resArr[schoolInd].school);
        expect(selectedSchoolValue).toBeInTheDocument();

      }, 3000);

    });

  });

});