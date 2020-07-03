import React from 'react';
import { render } from '@testing-library/react';
import { TopNav } from './top-nav.component';

test('renders REACT Game of Life', () => {
  const { getByText } = render(<TopNav />);
  const text = getByText(/REACT Game of Life/i);
  expect(text).toBeInTheDocument();
});
