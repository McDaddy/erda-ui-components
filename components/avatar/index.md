---
title: Avatar
nav:
  path: /components
  title: 组件
group:
  path: /common
  title: 通用
---

## Avatar

### 基本用法

```tsx
import React from 'react';
import { Avatar } from 'erda-ui-components';

export default () => <Avatar url="https://joeschmoe.io/api/v1/random" />;
```

### 显示名称

分两种形式显示头像名称

- Tooltip 弹出
- 显示在头像图片右侧

```tsx
import React from 'react';
import { Avatar } from 'erda-ui-components';

export default () => (
  <>
    <span>
      <Avatar name="戣蓦" showName="tooltip" url="//joeschmoe.io/api/v1/random" />
    </span>
    <span style={{ marginLeft: '16px' }}>
      <Avatar name="戣蓦" showName url="//joeschmoe.io/api/v1/random" />
    </span>
  </>
);
```

### 改变大小

```tsx
import React from 'react';
import { Avatar, Button } from 'erda-ui-components';

export default () => {
  const [size, setSize] = React.useState(24);

  return (
    <>
      <Button type="primary" onClick={() => setSize(50)}>
        变大
      </Button>
      <Button onClick={() => setSize(24)}>还原</Button>
      <div style={{ marginTop: '12px' }}>
        <Avatar name="戣蓦" showName="tooltip" size={size} url="//joeschmoe.io/api/v1/random" />
      </div>
    </>
  );
};
```

### 预设头像

有的时候并没有具体的头像图片链接提供，此时就需要使用系统预设的头像

```tsx
import React from 'react';
import { Avatar } from 'erda-ui-components';

export default () => {
  const images = ['https://joeschmoe.io/api/v1/random', '//joeschmoe.io/api/v1/random'];

  return (
    <>
      <span>
        <Avatar name="戣蓦" showName="tooltip" imgPresets={images} />
      </span>
      <span style={{ marginLeft: '16px' }}>
        <Avatar name="cwt" showName="tooltip" imgPresets={images} />
      </span>
    </>
  );
};
```

### API

| 参数          | 说明                                    | 类型                 | 默认值 | 版本 |
| ------------- | --------------------------------------- | -------------------- | ------ | ---- |
| url           | 图片地址                                | string               | -      |      |
| showName      | 是否显示头像名称                        | boolean \| 'tooltip' | false  |      |
| name          | 头像名称，当 showName 不为 false 时显示 | string               | -      |      |
| size          | 头像尺寸，单位 px                       | number               | 24     |      |
| className     |                                         |                      |        |      |
| wrapClassName |                                         |                      |        |      |
| imgPresets    |                                         |
