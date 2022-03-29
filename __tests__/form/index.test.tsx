import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Form, { ArrayFieldType, Schema, IFormStep } from 'src/form';
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
  StepForm,
} = Form;

describe('erda form test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
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

  it('render step form', async () => {
    const form = createForm();
    const fieldsConfig = createFields([
      {
        component: Input,
        title: '姓名',
        name: 'username',
        customProps: {
          placeholder: '请输入姓名',
        },
        required: true,
        stepName: 'first',
      },
      {
        component: Input,
        title: '年龄',
        name: 'age',
        customProps: {
          placeholder: '请输入年龄',
        },
        stepName: 'second',
      },
      {
        component: Input,
        title: '性别',
        name: 'sex',
        customProps: {
          placeholder: '请输入性别',
        },
        stepName: 'third',
      },
      {
        component: Input,
        title: '学历',
        name: 'education',
        customProps: {
          placeholder: '请输入学历',
        },
        stepName: 'third',
      },
      {
        component: Input,
        title: '无效字段',
        name: 'none',
      },
    ]);
    const buttonGroup = (formStep: IFormStep) => {
      return (
        <div>
          {formStep.allowBack && (
            <Button
              onClick={() => {
                formStep.back();
              }}
            >
              上一步
            </Button>
          )}
          {formStep.allowNext && (
            <Button
              onClick={() => {
                formStep.next();
              }}
            >
              下一步
            </Button>
          )}
          {!formStep.allowNext && (
            <Button
              onClick={() => {
                // getValue();
              }}
            >
              提交
            </Button>
          )}
        </div>
      );
    };
    const ref = {
      current: null,
    };
    const { getByText, container } = render(
      <StepForm
        style={{ width: '80%' }}
        form={form}
        formRef={ref}
        fieldsConfig={fieldsConfig}
        stepConfig={[
          { stepName: 'first', stepTitle: '第一步' },
          { stepName: 'second', stepTitle: '第二步' },
          { stepName: 'third', stepTitle: '第三步' },
        ]}
        stepButtonGroup={buttonGroup}
      />,
    );
    expect(getByText('姓名')).toBeInTheDocument();
    userEvent.click(screen.getByText('下一步'));
    await waitFor(() => expect(getByText('The field value is required')).toBeInTheDocument());
    userEvent.type(container.querySelector('.ant-input')!, '张三');
    userEvent.click(screen.getByText('下一步'));
    await waitFor(() => expect(getByText('年龄')).toBeInTheDocument());
    userEvent.click(screen.getByText('下一步'));
    await waitFor(() => expect(getByText('性别')).toBeInTheDocument());
    expect(getByText('学历')).toBeInTheDocument();
  });
});
