import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Form, { ArrayFieldType, Schema } from 'src/form';
import { Input, Select, Space, Button } from 'antd';

const {
  createForm,
  takeAsyncDataSource,
  connect,
  mapProps,
  observer,
  RecursionField,
  useFieldSchema,
  useField,
  createFields,
} = Form;

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
    const FormSelect = connect(
      Select,
      mapProps({
        dataSource: 'options',
      }),
    );
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
        component: FormSelect,
        title: '省份',
        name: 'province',
        customProps: {
          placeholder: '请选择省份',
        },
      },
    ];

    const { getByText } = render(<Form form={form} fieldsConfig={fieldsConfig} />);
    userEvent.click(getByText('请选择省份'));
    await waitFor(() => expect(screen.getByText('台湾')).toBeInTheDocument());
  });

  it('render array field', async () => {
    interface DataType {
      name: string;
      age: string;
    }
    const ArrayItems = observer((props: { value: DataType[] }) => {
      const schema = useFieldSchema();
      const field = useField<ArrayFieldType>();
      return (
        <div>
          {props.value?.map((_item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} style={{ marginBottom: 10 }}>
              <Space>
                <RecursionField schema={schema.items! as Schema} name={index} />
                <Button
                  onClick={() => {
                    field.remove(index);
                  }}
                  style={{ marginBottom: '22px' }}
                >
                  Remove
                </Button>
                <Button
                  onClick={() => {
                    field.moveUp(index);
                  }}
                  style={{ marginBottom: '22px' }}
                >
                  Up
                </Button>
                <Button
                  onClick={() => {
                    field.moveDown(index);
                  }}
                  style={{ marginBottom: '22px' }}
                >
                  Down
                </Button>
              </Space>
            </div>
          ))}
          <Button
            onClick={() => {
              field.push({});
            }}
          >
            Add
          </Button>
        </div>
      );
    });
    const form = createForm();
    const fieldsConfig = createFields([
      {
        type: 'array',
        component: ArrayItems,
        name: 'arrayField',
        items: [
          {
            component: Input,
            name: 'name',
            title: '姓名',
          },
          {
            component: Input,
            name: 'age',
            label: '年龄',
          },
        ],
      },
    ]);

    const { container } = render(<Form form={form} fieldsConfig={fieldsConfig} />);
    userEvent.click(screen.getByText('Add'));
    userEvent.click(screen.getByText('Add'));
    expect(container.getElementsByClassName('ant-input')).toHaveLength(4);
  });
});
