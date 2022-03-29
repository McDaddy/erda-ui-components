import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErdaIcon, { ErdaIconProps, useErdaIcon } from 'src/icon';

const TestIconComp = (props: ErdaIconProps<'green' | 'red'>) => {
  useErdaIcon({
    url: 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons.es5.js',
    colors: {
      green: '#52C41A',
    },
    mapping: {
      map: 'lock',
    },
  });

  return <ErdaIcon {...props} />;
};

describe('test Erda Icon', () => {
  it('render basic icon', () => {
    const { container } = render(<TestIconComp type="lock" />);
    const iconDom = container.querySelector('iconpark-icon');
    expect(iconDom?.getAttribute('name')).toBe('lock');
  });
  it('render predefine color icon', () => {
    const { container } = render(<TestIconComp type="lock" color="green" stroke="green" fill="green" />);
    const iconDom = container.querySelector('iconpark-icon');
    expect(iconDom?.getAttribute('color')).toBe('#52C41A');
    expect(iconDom?.getAttribute('stroke')).toBe('#52C41A');
    expect(iconDom?.getAttribute('fill')).toBe('#52C41A');
  });
  it('render disableCurrent icon', () => {
    const { container } = render(<TestIconComp type="lock" disableCurrent />);
    const iconDom = container.querySelector('iconpark-icon');
    expect(iconDom?.getAttribute('color')).toBeNull();
    expect(iconDom?.getAttribute('stroke')).toBeNull();
    expect(iconDom?.getAttribute('fill')).toBeNull();
  });
  it('render mapped icon', () => {
    const { container } = render(<TestIconComp type="map" />);
    const iconDom = container.querySelector('iconpark-icon');
    expect(iconDom?.getAttribute('name')).toBe('lock');
  });
});
