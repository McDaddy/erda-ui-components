---
title: Form
nav:
  path: /components
  title: 组件
---

# 表单 Form

### 基本用法

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/basic.tsx) -->
<!-- The below code snippet is automatically added from ./demos/basic.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

### 编辑表单

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/edit.tsx) -->
<!-- The below code snippet is automatically added from ./demos/edit.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

### 重置表单

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/reset.tsx) -->
<!-- The below code snippet is automatically added from ./demos/reset.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

### 异步数据源

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/async-dataSource.tsx) -->
<!-- The below code snippet is automatically added from ./demos/async-dataSource.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

### 字段联动

#### 一对一

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/linkage/one-to-one.tsx) -->
<!-- The below code snippet is automatically added from ./demos/linkage/one-to-one.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

#### 依赖联动

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/linkage/dependency.tsx) -->
<!-- The below code snippet is automatically added from ./demos/linkage/dependency.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

#### 自身联动

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/linkage/self.tsx) -->
<!-- The below code snippet is automatically added from ./demos/linkage/self.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

### 异步联动

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/linkage/async1.tsx) -->
<!-- The below code snippet is automatically added from ./demos/linkage/async1.tsx -->

```tsx
import React from 'react';
import { Select, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, onFieldValueChange, createFields, isField, isObjectField, isArrayField } = Form;

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
        if (isField(provinceField) && !isArrayField(provinceField) && !isObjectField(provinceField)) {
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

<!-- AUTO-GENERATED-CONTENT:END -->

方案二：

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/linkage/async2.tsx) -->
<!-- The below code snippet is automatically added from ./demos/linkage/async2.tsx -->

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
      const promise = new Promise<Array<{ value: string; label: string }>>((resolve) => {
        setTimeout(() => {
          let options = [];
          if (country === 'usa') {
            options = [
              { value: 'ma', label: '马萨诸塞' },
              { value: 'ny', label: '纽约' },
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

<!-- AUTO-GENERATED-CONTENT:END -->

### 字段校验

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/validator.tsx) -->
<!-- The below code snippet is automatically added from ./demos/validator.tsx -->

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
        field.selfErrors = ['A必须大于B'];
      } else {
        field.selfErrors = [''];
        form.setFieldState('linkB', (state) => {
          state.selfErrors = [''];
        });
      }
    });
    onFieldValueChange('linkB', (field) => {
      const fieldA = field.query('linkA').value();
      if (field.value >= fieldA) {
        field.selfErrors = ['A必须大于B'];
      } else {
        field.selfErrors = [''];
        form.setFieldState('linkA', (state) => {
          state.selfErrors = [''];
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

<!-- AUTO-GENERATED-CONTENT:END -->

### 表单布局

#### Grid 布局

##### 多列布局

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/layout/multi-col.tsx) -->
<!-- The below code snippet is automatically added from ./demos/layout/multi-col.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

##### 自定义布局

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/layout/custom.tsx) -->
<!-- The below code snippet is automatically added from ./demos/layout/custom.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

##### 插入非表单内容

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/layout/none-form.tsx) -->
<!-- The below code snippet is automatically added from ./demos/layout/none-form.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

### 自定义组件

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/custom-comp.tsx) -->
<!-- The below code snippet is automatically added from ./demos/custom-comp.tsx -->

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields } = Form;

const form = createForm();

const CustomComp = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('onMount Custom Component');
  }, []);

  React.useEffect(() => {
    setCount(value?.length);
  }, [value]);

  return (
    <div style={{ display: 'flex', paddingLeft: '16px' }}>
      <div>{count}</div>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
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

<!-- AUTO-GENERATED-CONTENT:END -->

### 性能

Antd Form 实现 300 个字段求和加总

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/performance/antd.tsx) -->
<!-- The below code snippet is automatically added from ./demos/performance/antd.tsx -->

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
  .map((_item, index) => index);

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
            {/*  @ts-ignore no fix */}
            <CustomComp
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

<!-- AUTO-GENERATED-CONTENT:END -->

Erda Form 实现 300 个字段求和加总

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/performance/erda.tsx) -->
<!-- The below code snippet is automatically added from ./demos/performance/erda.tsx -->

```tsx
import React from 'react';
import { InputNumber } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, onFieldValueChange, isField } = Form;

const CustomComp = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  console.log('render child');
  return <InputNumber value={value} onChange={onChange} />;
};

const form = createForm({
  effects: () => {
    onFieldValueChange('*(!sum)', () => {
      const sumResult = form.query('*(!sum)').reduce((sum, _field) => {
        if (isField(_field)) {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          return sum + (_field.value || 0);
        }
        return sum;
      }, 0);
      form.setFieldState('sum', (state) => {
        state.value = sumResult;
      });
    });
  },
});

const list = new Array(300)
  .toString()
  .split(',')
  .map((_item, index) => index);

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
    // @ts-ignore no fix
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

<!-- AUTO-GENERATED-CONTENT:END -->

### 数组字段

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/array/array-field.tsx) -->
<!-- The below code snippet is automatically added from ./demos/array/array-field.tsx -->

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
        {field.value?.map((_item, index) => (
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

<!-- AUTO-GENERATED-CONTENT:END -->

### 对象数组字段

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/array/array-object.tsx) -->
<!-- The below code snippet is automatically added from ./demos/array/array-object.tsx -->

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
      {props.value?.map((_item, index) => (
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
      layoutConfig: { layout: 'inline' },
      gridConfig: { minColumns: 2 },
      items: [
        {
          component: Input,
          name: 'name',
          required: true,
        },
        {
          component: Input,
          name: 'age',
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

<!-- AUTO-GENERATED-CONTENT:END -->

### Tab 数组

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/array/array-tabs.tsx) -->
<!-- The below code snippet is automatically added from ./demos/array/array-tabs.tsx -->

```tsx
import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields, ArrayTabs, onFieldValueChange, isField } = Form;

const form = createForm({
  effects: () => {
    onFieldValueChange('arrayTabs.*.name', (field) => {
      const field2 = form.query(field.path.splice(-1, 1, 'name2')).take();
      if (isField(field2)) {
        field2.setValue(field.value);
      }
    });
  },
});

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
          title: '姓名副本',
          name: 'name2',
          customProps: {
            disabled: true,
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
```

<!-- AUTO-GENERATED-CONTENT:END -->

### 分步表单

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/step-form.tsx) -->
<!-- The below code snippet is automatically added from ./demos/step-form.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->

### 可选 Table

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/selectTable.tsx) -->
<!-- The below code snippet is automatically added from ./demos/selectTable.tsx -->

```tsx
import React from 'react';
import { Button } from 'antd';
import { Form } from 'erda-ui-components';

const { createForm, createFields, takeAsyncDataSource, SelectTable } = Form;

const form = createForm();
const form2 = createForm({
  effects: () => {
    takeAsyncDataSource<Array<{ name: string }>>(
      'username',
      () =>
        new Promise<Array<{ name: string }>>((resolve) => {
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
        valueType: 'all',
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
        valueType: 'all',
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
          slotNode: (
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

<!-- AUTO-GENERATED-CONTENT:END -->

### 多 Tab 表单

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/form-tabs.tsx) -->
<!-- The below code snippet is automatically added from ./demos/form-tabs.tsx -->

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

<!-- AUTO-GENERATED-CONTENT:END -->
