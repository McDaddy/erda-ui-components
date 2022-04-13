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
      extraConfig={{ tableKey: 'basic', whiteHeader: true }}
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

### 批量操作

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/batch-operation.tsx) -->
<!-- The below code snippet is automatically added from ./demos/batch-operation.tsx -->

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
        actions: [
          {
            key: 'select',
            name: '选择',
            onClick: () => {
              return 1;
            },
            isVisible: (keys) => keys.length > 0,
          },
          {
            key: 'select2',
            name: '操作',
            onClick: (selectedKeys) => {
              console.log(selectedKeys);
            },
            isVisible: (keys) => keys.length > 0,
          },
        ],
      }}
    />
  );
};
```

<!-- AUTO-GENERATED-CONTENT:END -->

### 空数据页面（针对后端分页）

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./demos/empty-text.tsx) -->
<!-- The below code snippet is automatically added from ./demos/empty-text.tsx -->

```tsx
import React from 'react';
import { Table } from 'erda-ui-components';

export default () => {
  const [dataSource, setDataSource] = React.useState<Array<{ name: string; age: number; address: string }>>([]);
  const [current, setCurrent] = React.useState(2);

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

  const onTableChange = (pagination: { current: number }) => {
    const { current: cPageNo } = pagination;
    setCurrent(cPageNo);
    if (cPageNo === 1) {
      setDataSource([
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
      ]);
    }
  };

  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={dataSource}
      extraConfig={{ whiteHeader: true }}
      pagination={{ current, total: 2 }}
      onChange={onTableChange}
    />
  );
};
```

<!-- AUTO-GENERATED-CONTENT:END -->
