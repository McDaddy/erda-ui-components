---
title: Pagination
nav:
  path: /components
  title: 组件
---

# Pagination

此为完全受控组件

### 基本用法

```tsx
import React from 'react';
import { Pagination } from '@erda-ui/components';

export default () => {
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const onChange = (pageNo: number, size: number) => {
    setCurrent(pageNo);
    setPageSize(size);
  };

  return <Pagination total={99} pageSize={pageSize} onChange={onChange} current={current} />;
};
```
