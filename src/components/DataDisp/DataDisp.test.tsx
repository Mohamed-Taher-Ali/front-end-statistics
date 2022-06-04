import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { DataDisp } from './index';
import { MyStore } from 'src/store/Provider';
import { IData } from 'src/config/types';


describe('test data drawer', () => {
  const data: IData = {
    country: 'country',
    school: 'school',
    month: 'month',
    camp: 'camp',
    lessons: 55,
    id: '1',
  };

  render(
    <MyStore>
      <DataDisp {...data} />
    </MyStore>
  );

  test("component should print details-out-box", async () => {
    setTimeout(async () => {
      const outC = await screen.findByText('details-out-box');

      expect(outC).toBeInTheDocument();
    }, 1000);
  });


  test("component should print details-inner-box with num of data keys length", async () => {
    setTimeout(async () => {
      const outC = await screen.getAllByText('details-inner-box');

      expect(outC.length).toBe(Object.keys(data).length);
      expect(outC).toBeInTheDocument();
    }, 1000);
  });

  test("data values should be in doc", async () => {
    setTimeout(async () => {
      for(const [key, val] of Object.entries(data))
        expect(val).toBeInTheDocument();
    }, 1000);
  });

});