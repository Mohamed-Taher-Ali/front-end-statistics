import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import App from './App';


describe('test app', () => {
  render(<App />);

  test("print please wait on loading --test my suspense component", async() => {
    const linkElement = await screen.getByText(/Please Wait/i);
    expect(linkElement).toBeInTheDocument();
  });
});