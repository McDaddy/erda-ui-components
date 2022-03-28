import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from 'src/form';
import { Input, Select } from 'antd';

const { createForm, takeAsyncDataSource } = Form;

describe('erda form test', () => {
  it('render basic form', async () => {
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

    const { getByText } = render(<Form form={form} fieldsConfig={fieldsConfig} />);
    expect(getByText('姓名')).toBeInTheDocument();
  });

  it('render async form', async () => {
    const form = createForm({
      effects: () => {
        takeAsyncDataSource<Array<{ label: string; value: string }>>(
          'province',
          (_field) =>
            new Promise<Array<{ value: string; label: string }>>((resolve) => {
              resolve([
                {
                  value: 'zhejiang',
                  label: '浙江',
                },
                {
                  value: 'taiwan',
                  label: '台湾',
                },
              ]);
            }),
        );
      },
    });
    const fieldsConfig = [
      {
        component: Select,
        title: '省份',
        name: 'province',
      },
    ];

    const { getByText } = render(<Form form={form} fieldsConfig={fieldsConfig} />);
    expect(getByText('省份')).toBeInTheDocument();
  });
});
