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
import { Tooltip } from 'antd';

export default () => {
  const columns = [
    {
      title: '集群名称',
      dataIndex: 'clusterName',
      render: (value: string) => <Tooltip title={value}>{value}</Tooltip>,
    },
    {
      title: '域名',
      dataIndex: 'domain',
      render: (value: string) => <Tooltip title={value}>{value}</Tooltip>,
    },
    {
      title: '归属类型',
      dataIndex: 'type',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      render: (value: string) => <Tooltip title={value}>{value}</Tooltip>,
    },
    {
      title: '应用名',
      dataIndex: 'appName',
      render: (value: string) => <Tooltip title={value}>{value}</Tooltip>,
    },
    {
      title: '环境',
      dataIndex: 'workspace',
    },
  ];

  const dataSource = [
    {
      clusterName: 'daily-cluster',
      domain: 'erda.cloud',
      type: 'API网关',
      projectName: 'auto-cmp-project',
      appName: 'base-api-design',
      workspace: '测试',
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};
```
