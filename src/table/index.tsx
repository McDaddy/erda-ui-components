import React from 'react';
import { Table, TableProps } from 'antd';
import cn from 'classnames';
import { usePrefixCls } from '../_util/hooks';
import { ColumnType } from 'antd/lib/table';

interface ErdaColumnType<T> extends ColumnType<T> {
  subTitle?: ((text: string, record: T, index: number) => React.ReactNode) | React.ReactNode;
  icon?: ((text: string, record: T, index: number) => React.ReactNode) | React.ReactNode;
  show?: boolean;
  hidden?: boolean;
  sortTitle?: React.ReactNode;
}

export interface ErdaTableProps<T = unknown> extends TableProps<T> {
  columns: Array<ErdaColumnType<T>>;
}

const ErdaTable = <T extends object>({
  onRow,
  rowKey,
  rowClassName,
  onChange,
  dataSource,
  className,
  columns,
  ...restTableProps
}: ErdaTableProps<T>) => {
  const prefixCls = usePrefixCls();

  return (
    <>
      <Table
        rowKey={rowKey}
        scroll={{ x: '100%' }}
        columns={[
          ...columns.filter((item) => !item.hidden).map((item) => ({ ...item, title: item.sortTitle || item.title })),
          // ...renderActions(actions),
        ]}
        rowClassName={onRow ? `cursor-pointer ${rowClassName || ''}` : rowClassName}
        size="small"
        pagination={false}
        onChange={onChange}
        dataSource={dataSource}
        onRow={onRow}
        // rowSelection={
        //   rowSelection
        //     ? {
        //         ...rowSelection,
        //         selectedRowKeys,
        //         onChange(selectedRowKeyList, selectedRows) {
        //           rowSelection?.onChange?.(selectedRowKeyList, selectedRows);
        //           setSelectedRowKeys(() => selectedRows.map((r) => getKey(r)));
        //         },
        //       }
        //     : undefined
        // }
        // {...props}
        className={cn(`${prefixCls}-erda-table`, className)}
        tableLayout="auto"
        // locale={{
        //   emptyText:
        //     !pagination?.current || pagination?.current === 1 ? null : (
        //       <span>
        //         {i18n.t('This page has no data, whether to go')}
        //         <span className="fake-link ml-1" onClick={() => onTableChange({ pageNo: 1 })}>
        //           {i18n.t('page 1')}
        //         </span>
        //       </span>
        //     ),
        // }}
        {...restTableProps}
      />
    </>
  );
};

export default ErdaTable;
