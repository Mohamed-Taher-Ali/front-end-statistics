import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {LoadingIndicator} from '.';


describe('test indicator comp', () => {
  render(<LoadingIndicator color='red' type='balls' />);

  test("print please wait on loading", async() => {
    const linkElement = await screen.getByText(/Please Wait/i);
    expect(linkElement).toBeInTheDocument();
  });
});