import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from 'src/form';
import { Input } from 'antd';

describe('erda form test', () => {
  it('render basic form', async () => {
    const { createForm } = Form;
    const form = createForm();
    const fieldsConfig = [
      {
        component: Input,
        title: '姓名',
        name: 'username',
        customProps: {
          placeholder: '请输入姓名',
        },
      },
    ];

    const { getByText } = render(<Form style={{ width: '50%' }} form={form} fieldsConfig={fieldsConfig} />);
    expect(getByText('姓名')).toBeInTheDocument();
  });
});
