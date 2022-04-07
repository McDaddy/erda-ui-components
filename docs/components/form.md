---
title: Form
nav:
  path: /components
  title: 组件
---

# 表单 Form

## 基本用法

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields } = Form;

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
```

## 编辑表单

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields } = Form;

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

  const fieldsConfig = createFields([
    {
      component: Input,
      title: '姓名',
      name: 'username',
      customProps: {
        placeholder: '请输入姓名',
      },
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
```

## 重置表单

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields } = Form;

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
    },
  ]);

  const getValue = () => {
    const state = form.getState();
    setData(JSON.stringify(state.values, null, 2));
  };

  const resetForm = () => {
    form.reset();
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
      <div>
        <Button style={{ marginRight: '12px' }} type="primary" onClick={() => getValue()}>
          提交
        </Button>
        <Button onClick={() => resetForm()}>重置</Button>
      </div>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

## 异步数据源

```tsx
import React from 'react';
import { Select, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, takeAsyncDataSource, createFields } = Form;

const form = createForm({
  effects: () => {
    takeAsyncDataSource<Array<{ label: string; value: string }>>(
      'province',
      () =>
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
      'options',
    );
  },
});

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      component: Select,
      title: '省份',
      name: 'province',
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
```

## 字段联动

### 一对一

```tsx
import React from 'react';
import { InputNumber, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, onFieldValueChange, createFields } = Form;

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

  const fieldsConfig = createFields([
    {
      component: InputNumber,
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
      component: InputNumber,
      title: '明年年龄',
      name: 'nextAge',
      customProps: {
        placeholder: '请输入年龄',
        min: 0,
      },
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
```

### 依赖联动

```tsx
import React from 'react';
import { InputNumber, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, onFieldValueChange, createFields } = Form;

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

  const fieldsConfig = createFields([
    {
      component: InputNumber,
      title: '单价',
      name: 'price',
      customProps: {
        placeholder: '请输入单价',
        min: 0,
      },
    },
    {
      component: InputNumber,
      title: '数量',
      name: 'count',
      customProps: {
        placeholder: '请输入数量',
        min: 0,
      },
    },
    {
      component: InputNumber,
      title: '总价',
      name: 'sum',
      customProps: {
        disabled: true,
      },
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
```

### 自身联动

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, onFieldValueChange, createFields } = Form;

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

  const fieldsConfig = createFields([
    {
      component: Input,
      title: '颜色',
      defaultValue: '#6a549e',
      name: 'color',
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
```

### 异步联动

```tsx
import React from 'react';
import { Select, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, onFieldValueChange, createFields, isField } = Form;

const form = createForm({
  effects: () => {
    onFieldValueChange('country', (field) => {
      field.loading = true;
      setTimeout(() => {
        field.loading = false;
        const provinceField = form.query('province').take();
        let options = [];
        if (field.value === 'usa') {
          options = [
            { value: 'ma', label: '马萨诸塞' },
            { value: 'Ny', label: '纽约' },
          ];
        } else {
          options = [
            { value: 'zj', label: '浙江' },
            { value: 'tw', label: '台湾' },
          ];
        }
        provinceField.setComponentProps({ options });
        if (isField(provinceField)) {
          provinceField.setValue(options[0].value);
        }
      }, 1000);
    });
  },
});

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      component: Select,
      title: '国家',
      name: 'country',
      customProps: {
        options: [
          { value: 'china', label: '中国' },
          { value: 'usa', label: '美国' },
        ],
      },
    },
    {
      component: Select,
      title: '省份',
      name: 'province',
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
```

方案二：

```tsx
import React from 'react';
import { Select, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, takeAsyncDataSource, createFields } = Form;

const form = createForm({
  effects: () => {
    takeAsyncDataSource('province', async (field) => {
      const country = field.query('country').value();
      if (!country) return [];
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          let options = [];
          if (country === 'usa') {
            options = [
              { value: 'ma', label: '马萨诸塞' },
              { value: 'Ny', label: '纽约' },
            ];
          } else {
            options = [
              { value: 'zj', label: '浙江' },
              { value: 'tw', label: '台湾' },
            ];
          }
          resolve(options);
        }, 1000);
      });
      promise.then((list) => {
        if (list?.length) {
          field.setValue(list[0].value);
        }
      });
      return promise;
    });
  },
});

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      component: Select,
      title: '国家',
      name: 'country',
      customProps: {
        options: [
          { value: 'china', label: '中国' },
          { value: 'usa', label: '美国' },
        ],
      },
    },
    {
      component: Select,
      title: '省份',
      name: 'province',
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
```

## 字段校验

```tsx
import React from 'react';
import { Input, InputNumber, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, registerValidateRules, onFieldValueChange, createFields } = Form;

const form = createForm({
  effects: () => {
    onFieldValueChange('linkA', (field) => {
      const fieldB = field.query('linkB').value();
      if (field.value < fieldB) {
        field.selfErrors = 'A必须大于B';
      } else {
        field.selfErrors = '';
        form.setFieldState('linkB', (state) => {
          state.selfErrors = '';
        });
      }
    });
    onFieldValueChange('linkB', (field) => {
      const fieldA = field.query('linkA').value();
      if (field.value >= fieldA) {
        field.selfErrors = 'A必须大于B';
      } else {
        field.selfErrors = '';
        form.setFieldState('linkA', (state) => {
          state.selfErrors = '';
        });
      }
    });
  },
});

registerValidateRules({
  customRule: (value) => {
    if (value && !value.includes('@')) {
      return '请输入包含@的字符串';
    }
    return '';
  },
});

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      component: Input,
      title: '必填',
      name: 'required1',
      required: true,
      customProps: {
        placeholder: '必填',
      },
    },
    {
      component: Input,
      title: '必填2',
      name: 'required2',
      customProps: {
        placeholder: '必填2',
      },
      validator: {
        required: true,
      },
    },
    {
      component: InputNumber,
      title: '最大值',
      name: 'max',
      customProps: {
        placeholder: '>5报错',
      },
      validator: {
        maximum: 5,
      },
    },
    {
      component: InputNumber,
      title: '最大值',
      name: 'max2',
      customProps: {
        placeholder: '>=5报错',
      },
      validator: {
        exclusiveMaximum: 5,
      },
    },
    {
      component: InputNumber,
      title: '最小值',
      name: 'min',
      customProps: {
        placeholder: '<5报错',
      },
      validator: {
        minimum: 5,
      },
    },
    {
      component: InputNumber,
      title: '最小值',
      name: 'min2',
      customProps: {
        placeholder: '<=5报错',
      },
      validator: {
        exclusiveMinimum: 5,
      },
    },
    {
      component: Input,
      title: '最大长度',
      name: 'maxLength',
      customProps: {
        placeholder: '最多五个字符',
      },
      validator: {
        max: 5,
      },
    },
    {
      component: Input,
      title: '最小长度',
      name: 'minLength',
      customProps: {
        placeholder: '最少五个字符',
      },
      validator: {
        min: 5,
      },
    },
    {
      component: Input,
      title: '枚举匹配',
      name: 'enum',
      customProps: {
        placeholder: '只能是abc中任一',
      },
      validator: {
        enum: ['a', 'b', 'c'],
      },
    },
    {
      component: Input,
      title: '自定义报错信息',
      name: 'customMessage',
      customProps: {
        placeholder: '自定义报错信息',
      },
      validator: {
        max: 5,
        message: '这儿最多五个字符~哈哈',
      },
    },
    {
      component: Input,
      title: '多个校验条件',
      name: 'multiple',
      customProps: {
        placeholder: '最少3位最多5位',
      },
      validator: [
        {
          max: 5,
        },
        {
          min: 3,
        },
      ],
    },
    {
      component: Input,
      title: '内置格式校验',
      name: 'format',
      customProps: {
        placeholder: '只能输入email',
      },
      validator: {
        format: 'email',
      },
    },
    {
      component: Input,
      title: '全局自定义校验',
      name: 'custom',
      customProps: {
        placeholder: '必须包含@符号',
      },
      validator: {
        customRule: true,
      },
    },
    {
      component: Input,
      title: '局部自定义校验',
      name: 'custom2',
      customProps: {
        placeholder: '必须包含@符号',
      },
      validator: {
        validator: (value) => {
          if (value && !value.includes('@')) {
            return '请输入包含@的字符串';
          }
          return '';
        },
      },
    },
    {
      component: Input,
      title: '异步校验',
      name: 'async',
      customProps: {
        placeholder: '输入123',
      },
      validator: {
        validator: (value) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(value !== '123' ? '' : '该用户已被注册');
            }, 1000);
          }),
      },
    },
    {
      component: InputNumber,
      title: '联动校验A',
      name: 'linkA',
      customProps: {
        placeholder: 'A必须大于B',
      },
    },
    {
      component: InputNumber,
      title: '联动校验B',
      name: 'linkB',
      defaultValue: 10,
      customProps: {
        placeholder: 'A必须大于B',
      },
    },
    {
      component: Input,
      title: '校验时机(onBlur)',
      name: 'trigger',
      customProps: {
        placeholder: '最大长度5',
      },
      validator: {
        triggerType: 'onBlur',
        max: 5,
      },
      wrapperProps: {
        labelCol: 10,
      },
    },
  ]);

  const submit = async () => {
    const values = await form.submit();
    setData(JSON.stringify(values, null, 2));
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
      <Button type="primary" onClick={() => submit()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

## 表单布局

### Grid 布局

#### 多列布局

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields } = Form;

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
    },
    {
      component: Input,
      title: '昵称',
      name: 'nickName',
    },
    {
      component: Input,
      title: '年龄',
      name: 'age',
    },
    {
      component: Input,
      title: '性别',
      name: 'gender',
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
      <Form style={{ width: '70%' }} form={form} fieldsConfig={fieldsConfig} gridConfig={{ maxColumns: 2 }} />
      <Button type="primary" onClick={() => getValue()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

#### 自定义布局

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields } = Form;

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
      wrapperProps: {
        gridSpan: 2,
      },
    },
    {
      component: Input,
      title: '昵称',
      name: 'nickName',
    },
    {
      component: Input,
      title: '年龄',
      name: 'age',
    },
    {
      component: Input,
      title: '性别',
      name: 'gender',
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
      <Form style={{ width: '70%' }} form={form} fieldsConfig={fieldsConfig} gridConfig={{ maxColumns: 2 }} />
      <Button type="primary" onClick={() => getValue()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

#### 插入非表单内容

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields } = Form;

const form = createForm();

const Comp = () => <div style={{ backgroundColor: 'white', paddingLeft: '16px' }}>这是插入的内容</div>;

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
      wrapperProps: {
        gridSpan: 2,
      },
    },
    {
      component: Comp,
      type: 'void',
      name: 'void',
      wrapperProps: {
        gridSpan: 2,
      },
    },
    {
      component: Comp,
      type: 'void',
      name: 'void2',
      wrapperProps: {
        gridSpan: 2,
      },
    },
    {
      component: Input,
      title: '昵称',
      name: 'nickName',
    },
    {
      component: Input,
      title: '年龄',
      name: 'age',
    },
    {
      component: Input,
      title: '性别',
      name: 'gender',
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
      <Form style={{ width: '70%' }} form={form} fieldsConfig={fieldsConfig} gridConfig={{ maxColumns: 2 }} />
      <Button type="primary" onClick={() => getValue()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

## 自定义组件

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields, takeAsyncDataSource } = Form;

const form = createForm({
  effects: () => {
    takeAsyncDataSource('input', async () => {
      return 'xxx';
    });
  },
});

const CustomComp = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('onMount');
  }, []);

  React.useEffect(() => {
    setCount(value?.length);
  }, [value]);

  return (
    <div style={{ display: 'flex', paddingLeft: '16px' }}>
      <div>{count}</div>
      <Input value={value} onChange={onChange} />
    </div>
  );
};

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      title: 'Input',
      component: Input,
      name: 'input',
    },
    {
      title: '自定义组件',
      component: CustomComp,
      name: 'customValue',
    },
    {
      title: '自定义组件2',
      component: CustomComp,
      name: 'customValue2',
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
      <Form style={{ width: '70%' }} form={form} fieldsConfig={fieldsConfig} />
      <Button type="primary" onClick={() => getValue()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

## 性能

Antd Form 实现 300 个字段求和加总

```tsx
import React from 'react';
import { InputNumber, Form } from 'antd';

const CustomComp = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  // eslint-disable-next-line no-console
  console.log('render child');
  return <InputNumber style={{ width: '100%' }} value={value} onChange={onChange} />;
};

const list = new Array(300)
  .toString()
  .split(',')
  .map((item, index) => index);

export default () => {
  const [count, setCount] = React.useState(0);
  const [array, setArray] = React.useState(new Array(300));

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const result = array.reduce((acc, item) => acc + (item || 0), 0);
    setCount(result);
  }, [array]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#eee',
        padding: '40px 0',
        height: '300px',
        overflow: 'auto',
      }}
    >
      <div style={{ marginBottom: '16px' }}>总和： {count}</div>
      <Form style={{ width: '70%' }}>
        {list.map((i, index) => (
          <Form.Item key={i} label={`字段${i}`} name={`field${i}`}>
            <CustomComp
              sum={count}
              onChange={(v) => {
                array[index] = v;
                setArray([...array]);
              }}
            />
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};
```

Erda Form 实现 300 个字段求和加总

```tsx
import React from 'react';
import { InputNumber } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, onFieldValueChange } = Form;

const CustomComp = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  console.log('render child');
  return <InputNumber value={value} onChange={onChange} />;
};

const form = createForm({
  effects: () => {
    onFieldValueChange('*(!sum)', () => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const sumResult = form.query('*(!sum)').reduce((sum, _field) => sum + (_field.value || 0), 0);
      form.setFieldState('sum', (state) => {
        state.value = sumResult;
      });
    });
  },
});

const list = new Array(300)
  .toString()
  .split(',')
  .map((item, index) => index);

export default () => {
  const fieldsConfig = list.map((i) => ({
    title: `字段${i}`,
    component: CustomComp,
    name: `field${i}`,
  }));
  fieldsConfig.unshift({
    title: '总和',
    component: InputNumber,
    name: 'sum',
    customProps: {
      disabled: true,
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#eee',
        padding: '40px 0',
        height: '300px',
        overflow: 'auto',
      }}
    >
      <Form style={{ width: '70%' }} form={form} fieldsConfig={fieldsConfig} />
    </div>
  );
};
```

## 自增字段

### 数组字段

```tsx
import React from 'react';
import { Input, Space, Button } from 'antd';
import { Form, ArrayFieldType } from 'erda-ui-components';

const { createForm, observer, Field, useField, createFields } = Form;

const form = createForm();

const ArrayComponent = observer(() => {
  const field = useField<ArrayFieldType>();
  return (
    <>
      <div>
        {field.value?.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} style={{ display: 'flex-block', marginBottom: 10 }}>
            <Space>
              <Field name={index} component={[Input]} />
              <Button
                onClick={() => {
                  field.remove(index);
                }}
              >
                Remove
              </Button>
              <Button
                onClick={() => {
                  field.moveUp(index);
                }}
              >
                Move Up
              </Button>
              <Button
                onClick={() => {
                  field.moveDown(index);
                }}
              >
                Move Down
              </Button>
            </Space>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          field.push('');
        }}
      >
        Add
      </Button>
    </>
  );
});

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      type: 'array',
      component: ArrayComponent,
      name: 'arrayField',
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
      <Form style={{ width: '80%' }} form={form} fieldsConfig={fieldsConfig} />
      <Button type="primary" onClick={() => getValue()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

### 对象数组字段

```tsx
import React from 'react';
import { Button, Space, Input } from 'antd';
import { Form, Schema, ArrayFieldType } from 'erda-ui-components';

const { createForm, observer, RecursionField, useFieldSchema, useField, createFields } = Form;

const form = createForm();

interface DataType {
  name: string;
  age: string;
}

const ArrayItems = observer((props: { value: DataType[] }) => {
  const schema = useFieldSchema();
  const field = useField<ArrayFieldType>();
  return (
    <div>
      {props.value?.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} style={{ marginBottom: 10 }}>
          <Space>
            <RecursionField schema={schema.items as Schema} name={index} />
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

export default () => {
  const [data, setData] = React.useState('');

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
          required: true,
        },
        {
          component: Input,
          name: 'age',
          label: '年龄',
        },
      ],
    },
  ]);

  const getValue = async () => {
    const state = form.getState();
    await form.validate();
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
      <Form style={{ width: '80%' }} form={form} fieldsConfig={fieldsConfig} />
      <Button type="primary" onClick={() => getValue()}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

### 分步表单

```tsx
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
```

## 可选 Table

```tsx
import React from 'react';
import { Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields, takeAsyncDataSource, SelectTable } = Form;

const form = createForm();
const form2 = createForm({
  effects: () => {
    takeAsyncDataSource<Array<{ label: string; value: string }>>(
      'username',
      () =>
        new Promise<Array<{ value: string; label: string }>>((resolve) => {
          resolve([
            {
              name: '张三',
            },
            {
              name: '李四',
            },
          ]);
        }),
    );
  },
});

const dataSource = [{ name: 'Jim' }, { name: 'Mike' }];

let counter = 1;

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      component: SelectTable,
      name: 'username',
      customProps: {
        columns: [
          {
            dataIndex: 'name',
            title: '全选',
          },
        ],
        dataSource,
        primaryKey: 'name',
      },
    },
  ]);

  const onRefresh = async () => {
    setTimeout(() => {
      form2.setFieldState('username', (state) => {
        state.componentProps = {
          ...state.componentProps,
          dataSource: [...dataSource, { name: `John-${counter++}` }],
        };
      });
    }, 1000);
  };

  const fieldsConfig2 = createFields([
    {
      component: SelectTable,
      name: 'username',
      customProps: {
        columns: [
          {
            dataIndex: 'name',
            title: '全选',
          },
        ],
        primaryKey: 'name',
        showSearch: true,
        searchConfig: {
          placeholder: '搜索',
          slot: (
            <Button type="ghost" onClick={onRefresh}>
              刷新
            </Button>
          ),
        },
      },
    },
  ]);

  const getValue = (isTwo?: boolean) => {
    const state = (isTwo ? form2 : form).getState();
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
      <div>异步数据源</div>
      <Form style={{ width: '50%' }} form={form2} fieldsConfig={fieldsConfig2} />

      <Button type="primary" onClick={() => getValue(true)}>
        提交
      </Button>
      <code style={{ marginTop: data ? '24px' : '0' }}>{data}</code>
    </div>
  );
};
```

## Form Tab

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields, createTabsField } = Form;

const form = createForm();

export default () => {
  const [data, setData] = React.useState('');

  const fieldsConfig = createFields([
    {
      component: Input,
      title: '基本信息',
      name: 'info',
      customProps: {
        placeholder: '请输入基本信息',
      },
    },
    createTabsField({
      name: 'tabsField',
      customProps: {
        tabPosition: 'left',
      },
      tabs: [
        {
          tab: 'Tab1',
          fields: createFields([
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
          ]),
        },
        {
          tab: 'Tab2',
          fields: createFields([
            {
              component: Input,
              title: '性别',
              name: 'sex',
            },
            {
              component: Input,
              title: '学历',
              name: 'education',
            },
          ]),
        },
      ],
    }),
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
```
