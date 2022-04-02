import { TablePaginationConfig } from 'antd/lib/table/interface';
// import { BatchOperation } from 'common';
import React from 'react';
import Pagination from 'src/pagination';
import { usePrefixCls } from 'src/_util/hooks';
import cn from 'classnames';
// import { RowSelection } from './interface';

interface IProps {
  // rowKey?: string | GetRowKey<T>;
  // dataSource: T[];
  pagination: TablePaginationConfig | false;
  hidePagination: boolean;
  onTableChange: ([key]: any) => void;
  // rowSelection?: RowSelection<T>;
  whiteFooter?: boolean;
  // onSelectChange: (selectedRowKeys: Array<string | number>) => void;
}

const TableFooter = ({
  // rowSelection,
  pagination,
  hidePagination,
  onTableChange,
  whiteFooter,
}: // rowKey,
// dataSource,
// onSelectChange,
IProps) => {
  // const { actions, selectedRowKeys } = rowSelection ?? {};
  const [prefixCls] = usePrefixCls('table-footer');

  return (
    <div className={cn(`${prefixCls}`, { [`${prefixCls}-white`]: whiteFooter })}>
      {/* {actions ?
        <BatchOperation
          rowKey={rowKey}
          dataSource={dataSource}
          selectedKeys={selectedRowKeys}
          onSelectChange={onSelectChange}
          operations={actions}
        />
      ) : (
        <div />
      )} */}

      {!hidePagination && (
        <div className={`${prefixCls}-pagination`}>
          <Pagination {...pagination} onChange={(page, size) => onTableChange({ pageNo: page, pageSize: size })} />
        </div>
      )}
    </div>
  );
};

export default TableFooter;
