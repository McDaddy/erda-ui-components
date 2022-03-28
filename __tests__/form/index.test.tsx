import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('erda form test', () => {
  it('render basic form', async () => {
    const { getByText } = render(<div>123</div>);
    expect(getByText('123')).toBeInTheDocument();
  });
});
