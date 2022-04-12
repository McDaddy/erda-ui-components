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

  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={[]}
      extraConfig={{ whiteHeader: true }}
      pagination={{ current: 2 }}
    />
  );
};
