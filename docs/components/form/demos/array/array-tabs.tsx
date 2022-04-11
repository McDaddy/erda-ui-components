import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields, ArrayTabs } = Form;

const form = createForm();

export default () => {
  const [data, setData] = React.useState('');
  const [formData, setFormData] = React.useState<any>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setFormData({
        arrayTabs: [
          {
            name: '张三',
            age: 22,
          },
          {
            name: '李四',
            age: 33,
          },
        ],
      });
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (formData) {
      form.setValues(formData);
    }
  }, [formData]);

  const fieldsConfig = createFields([
    {
      type: 'array',
      customProps: {
        tabPosition: 'left',
        type: 'line',
        tabTitle: (item) => {
          return item?.name;
        },
      },
      name: 'arrayTabs',
      component: ArrayTabs,
      items: [
        {
          component: Input,
          title: '姓名',
          name: 'name',
          customProps: {
            placeholder: '请输入姓名',
          },
        },
        {
          component: Input,
          title: '年龄',
          name: 'age',
          customProps: {
            placeholder: '请输入年龄',
          },
        },
      ],
    },
  ]);

  const getValue = () => {
    const state = form.getState();
    setData(JSON.stringify(state.values, null, 2));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Form style={{ width: '50%' }} form={form} fieldsConfig={fieldsConfig} />
      <Button type="primary" onClick={() => getValue()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
