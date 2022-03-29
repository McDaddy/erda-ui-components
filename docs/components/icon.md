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
import { ErdaIcon, useErdaIcon } from 'erda-ui-components';

export default () => {
  useErdaIcon({
    url: 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_138_430.0403c6a0a00cff5b144244eb211e0af9.es5.js',
  });

  return <ErdaIcon type="lock" />;
};
```

### 设置图标映射

```tsx
import React from 'react';
import { ErdaIcon, useErdaIcon } from 'erda-ui-components';

export default () => {
  useErdaIcon({
    url: 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_138_430.0403c6a0a00cff5b144244eb211e0af9.es5.js',
    mapping: {
      map: 'lock',
    },
  });

  return <ErdaIcon type="map" />;
};
```

### 图标颜色

```tsx
import React from 'react';
import { ErdaIcon, useErdaIcon } from 'erda-ui-components';

export default () => {
  useErdaIcon({
    url: 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_138_430.0403c6a0a00cff5b144244eb211e0af9.es5.js',
    colors: {
      green: '#52C41A',
    },
  });

  return <ErdaIcon type="jinru" color="green" stroke="green" fill="green" size="24px" />;
};
```
