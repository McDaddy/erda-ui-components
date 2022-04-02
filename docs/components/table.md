---
title: Table
nav:
  path: /components
  title: 组件
---

## Table 表格

### 基本用法

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

### 行操作

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
    render: (record) => {
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

### 排序

```tsx
import React from 'react';
import { Table } from 'erda-ui-components';

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => (a.age > b.age ? 1 : -1),
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

### 行选择

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

### 分页

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
