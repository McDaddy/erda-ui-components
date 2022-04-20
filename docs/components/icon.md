---
title: Icon
nav:
  path: /components
  title: 组件
---

## Icon 图标

### 图标组件

```tsx
import React from 'react';
import { ErdaIcon, useErdaIcon } from '@erda-ui/components';

export default () => {
  useErdaIcon();

  return <ErdaIcon type="chinese" />;
};
```

### 添加自定义 iconfont

```tsx
import React from 'react';
import { ErdaIcon, useErdaIcon } from '@erda-ui/components';

export default () => {
  useErdaIcon({
    url: '//at.alicdn.com/t/font_500774_mn4zbo4c94.js',
  });

  return <ErdaIcon type="aliyun" />;
};
```

### 图标颜色大小

```tsx
import React from 'react';
import { ErdaIcon, useErdaIcon } from '@erda-ui/components';

export default () => {
  useErdaIcon({
    colors: {
      green: '#52C41A',
    },
  });

  return <ErdaIcon type="bell" color="green" size="36px" />;
};
```
