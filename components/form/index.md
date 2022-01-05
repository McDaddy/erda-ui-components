---
title: Form
nav:
  path: /components
  title: 组件
group:
  path: /common
  title: 通用
---

# 表单 Form

## 基本用法

```tsx
import React from 'react';
import { Input } from 'antd';
import { Form, Button, ConfigProvider } from 'erda-ui-components';

const { createForm } = Form;

const form = createForm();

export default () => {
  const [data, setData] = React.useState('');

  const formConfig = [
    {
      type: { Input },
      title: '姓名',
      name: 'username',
      customProps: {
        placeholder: '请输入姓名',
      },
    },
  ];

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
      <ConfigProvider>
        <Form form={form} formConfig={formConfig} />
        <Button type="primary" onClick={() => getValue()}>
          提交
        </Button>
        <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
      </ConfigProvider>
    </div>
  );
};
```

## 编辑表单

```tsx
import React from 'react';
import { Input } from 'antd';
import { Form, Button, ConfigProvider } from 'erda-ui-components';

const { createForm } = Form;

const form = createForm();

export default () => {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          username: '张三',
        });
      }, 3000);
    }).then((res) => {
      form.setInitialValues(res);
    });
  }, []);

  const formConfig = [
    {
      type: { Input },
      title: '姓名',
      name: 'username',
      customProps: {
        placeholder: '请输入姓名',
      },
    },
  ];

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
      <ConfigProvider>
        <Form form={form} formConfig={formConfig} />
        <Button type="primary" onClick={() => getValue()}>
          提交
        </Button>
        <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
      </ConfigProvider>
    </div>
  );
};
```

## 字段联动

### 一对一

```tsx
import React from 'react';
import { InputNumber } from 'antd';
import { Form, Button, ConfigProvider } from 'erda-ui-components';

const { createForm, onFieldValueChange } = Form;

const form = createForm({
  effects: () => {
    onFieldValueChange('age', (field) => {
      if (field.value >= 100) {
        form.setFieldState('nextAge', (state) => {
          state.display = 'none';
        });
      } else {
        form.setFieldState('nextAge', (state) => {
          state.value = +field.value + 1;
          state.display = 'visible';
        });
      }
    });
  },
});

export default () => {
  const [data, setData] = React.useState('');

  const formConfig = [
    {
      type: { InputNumber },
      title: '年龄',
      name: 'age',
      customProps: {
        placeholder: '请输入年龄',
        min: 0,
      },
      wrapperProps: {
        tooltip: <div>输入100，下面的字段隐藏</div>,
      },
    },
    {
      type: { InputNumber },
      title: '明年年龄',
      name: 'nextAge',
      customProps: {
        placeholder: '请输入年龄',
        min: 0,
      },
    },
  ];

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
      <ConfigProvider>
        <Form form={form} formConfig={formConfig} />
        <Button type="primary" onClick={() => getValue()}>
          提交
        </Button>
        <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
      </ConfigProvider>
    </div>
  );
};
```

### 依赖联动

```tsx
import React from 'react';
import { InputNumber } from 'antd';
import { Form, Button, ConfigProvider } from 'erda-ui-components';

const { createForm, onFieldValueChange } = Form;

const form = createForm({
  effects: () => {
    onFieldValueChange('price', (field) => {
      const price = field.value;
      const count = field.query('count').value();
      form.setFieldState('sum', (state) => {
        state.value = price * count;
      });
    });
    onFieldValueChange('count', (field) => {
      const count = field.value;
      const price = field.query('price').value();
      form.setFieldState('sum', (state) => {
        state.value = price * count;
      });
    });
  },
});

export default () => {
  const [data, setData] = React.useState('');

  const formConfig = [
    {
      type: { InputNumber },
      title: '单价',
      name: 'price',
      customProps: {
        placeholder: '请输入单价',
        min: 0,
      },
    },
    {
      type: { InputNumber },
      title: '数量',
      name: 'count',
      customProps: {
        placeholder: '请输入数量',
        min: 0,
      },
    },
    {
      type: { InputNumber },
      title: '总价',
      name: 'sum',
      customProps: {
        disabled: true,
      },
    },
  ];

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
      <ConfigProvider>
        <Form form={form} formConfig={formConfig} />
        <Button type="primary" onClick={() => getValue()}>
          提交
        </Button>
        <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
      </ConfigProvider>
    </div>
  );
};
```

### 自身联动

```tsx
import React from 'react';
import { Input } from 'antd';
import { Form, Button, ConfigProvider } from 'erda-ui-components';

const { createForm, onFieldValueChange } = Form;

const form = createForm({
  effects: () => {
    onFieldValueChange('color', (field) => {
      field.setComponentProps({
        style: {
          backgroundColor: field.value,
        },
      });
    });
  },
});

export default () => {
  const [data, setData] = React.useState('');

  const formConfig = [
    {
      type: { Input },
      title: '颜色',
      defaultValue: '#6a549e',
      name: 'color',
    },
  ];

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
      <ConfigProvider>
        <Form form={form} formConfig={formConfig} />
        <Button type="primary" onClick={() => getValue()}>
          提交
        </Button>
        <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
      </ConfigProvider>
    </div>
  );
};
```
