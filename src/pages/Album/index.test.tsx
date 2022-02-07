import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Component from './';

test('renders album name', () => {
  render(<Component />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/album name/i);
  expect(linkElement).toBeInTheDocument();
});