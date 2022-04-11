import React from 'react';
import { Button, Input } from 'antd';
import { Form, IFormStep } from 'erda-ui-components';

const { createForm, createFields, StepForm } = Form;

const form = createForm();

export default () => {
  const [data, setData] = React.useState('');

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
  ]);

  const getValue = () => {
    const state = form.getState();
    setData(JSON.stringify(state.values, null, 2));
  };

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
              getValue();
            }}
          >
            提交
          </Button>
        )}
      </div>
    );
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
      <StepForm
        style={{ width: '80%' }}
        form={form}
        fieldsConfig={fieldsConfig}
        stepConfig={[
          { stepName: 'first', stepTitle: '第一步' },
          { stepName: 'second', stepTitle: '第二步' },
          { stepName: 'third', stepTitle: '第三步' },
        ]}
        stepButtonGroup={buttonGroup}
      />
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
