---
title: Table
nav:
  path: /components
  title: 组件
---

## Table 表格

### 基本用法

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/basic.tsx) -->
<!-- The below code snippet is automatically added from ./demos/basic.tsx -->

```tsx
import React from 'react';
import { Table } from 'erda-ui-components';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const dataSource = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={dataSource}
      headerConfig={{ tableKey: 'basic', whiteHeader: true }}
    />
  );
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

### 行操作

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/row-action.tsx) -->
<!-- The below code snippet is automatically added from ./demos/row-action.tsx -->

```tsx
import React from 'react';
import { Table } from 'erda-ui-components';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const dataSource = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  const actions = {
    render: (record: unknown) => {
      return [
        {
          title: '管理',
          onClick: () => {
            console.log(record);
          },
          disabled: true,
          disabledTip: 'disable reason',
        },
        {
          title: '编辑',
          onClick: () => {
            console.log(record);
          },
        },
      ];
    },
  };

  return <Table rowKey="name" columns={columns} dataSource={dataSource} actions={actions} />;
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

### 排序

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/sort.tsx) -->
<!-- The below code snippet is automatically added from ./demos/sort.tsx -->

```tsx
import React from 'react';
import { Table } from 'erda-ui-components';

interface Data {
  name: string;
  age: number;
}

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: Data, b: Data) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a: Data, b: Data) => (a.age > b.age ? 1 : -1),
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const dataSource = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  return <Table rowKey="name" columns={columns} dataSource={dataSource} />;
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

### 行选择

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/row-selection.tsx) -->
<!-- The below code snippet is automatically added from ./demos/row-selection.tsx -->

```tsx
import React from 'react';
import { Table } from 'erda-ui-components';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const dataSource = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={dataSource}
      rowSelection={{
        onChange: (_selectedKeys: string[], selectedRows: any[]) => {
          console.log(_selectedKeys, selectedRows);
        },
      }}
    />
  );
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

### 分页

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/pagination.tsx) -->
<!-- The below code snippet is automatically added from ./demos/pagination.tsx -->

```tsx
import React from 'react';
import { Table } from 'erda-ui-components';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const dataSource = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={dataSource}
      rowSelection={{
        onChange: (_selectedKeys: string[], selectedRows: any[]) => {
          console.log(_selectedKeys, selectedRows);
        },
      }}
    />
  );
};
```

<!-- AUTO-GENERATED-CONTENT:END -->
