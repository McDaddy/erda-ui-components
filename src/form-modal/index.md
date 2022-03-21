---
title: Form Modal
nav:
  path: /components
  title: 组件
group:
  path: /common
  title: 通用
---

## Form Modal

按钮组件

```tsx
import React from 'react';
import { FormModal, Form, ConfigProvider } from 'erda-ui-components';
import { Button, Input } from 'antd';

const { createForm, createFields } = Form;

const form = createForm();

const formFieldsList = createFields([
  {
    component: Input,
    title: '姓名',
    name: 'username',
    customProps: {
      placeholder: '请输入姓名',
    },
  },
]);

export default () => {
  const [visible, setVisible] = React.useState(false);

  const onSubmitForm = () => {
    // eslint-disable-next-line no-console
    console.log('value', form.values);
  };

  return (
    <ConfigProvider>
      <Button onClick={() => setVisible(true)}>显示</Button>
      <FormModal
        title="应用"
        visible={visible}
        onOk={onSubmitForm}
        onCancel={() => setVisible(false)}
        formProps={{
          form,
          layoutConfig: { layout: 'vertical' },
          fieldsConfig: formFieldsList,
        }}
      />
    </ConfigProvider>
  );
};
```
