---
title: ConfigProvider
nav:
  path: /components
  title: 组件
group:
  path: /other
  title: 其他
---

# ConfigProvider

介绍下 ConfigProvider 的用法

```tsx
import React from 'react';
import { ConfigProvider, Button } from 'erda-ui-components';

export default () => {
  const [count, setCount] = React.useState(0);
  const onChangeColor = () => {
    ConfigProvider.config({
      theme: {
        primaryColor: '#52c41a',
      },
    });
    setCount(count + 1);
  };

  return (
    <ConfigProvider>
      <div>
        <h2>ConfigProvider {count}</h2>
        <Button type="primary" onClick={onChangeColor}>
          FUCK2
        </Button>
      </div>
    </ConfigProvider>
  );
};
```
