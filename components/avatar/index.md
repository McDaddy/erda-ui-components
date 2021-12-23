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

Avatar 组件

```tsx
import React from 'react';
import { Avatar, ConfigProvider } from 'erda-ui-components';

export default () => {
  const imgs = ['http://blog.kuimo.top/avatar.jpg', 'http://blog.kuimo.top/avatar.jpg'];

  return (
    <ConfigProvider>
      <Avatar name="kuimo" showName="tooltip" imgPresets={imgs} />
    </ConfigProvider>
  );
};
```
