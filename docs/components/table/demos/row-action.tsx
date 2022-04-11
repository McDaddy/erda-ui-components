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
