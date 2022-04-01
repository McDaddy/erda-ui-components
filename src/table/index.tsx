import React from 'react';
import { Table, TableProps } from 'antd';
import cn from 'classnames';
import { usePrefixCls } from '../_util/hooks';
import { ColumnType } from 'antd/lib/table';
import TableConfigHeader from './table-config-header';
import { SorterResult } from 'antd/lib/table/interface';
import { useErdaIcon } from 'src/icon';
import { TableRowActions } from './interface';
import { renderActions } from './utils';

export interface ErdaColumnType<T> extends ColumnType<T> {
  subTitle?: ((text: string, record: T, index: number) => React.ReactNode) | React.ReactNode;
  icon?: ((text: string, record: T, index: number) => React.ReactNode) | React.ReactNode;
  hidden?: boolean;
  sortTitle?: React.ReactNode;
}

export interface ErdaTableProps<T = unknown> extends TableProps<T> {
  columns: Array<ErdaColumnType<T>>;
  headerConfig?: {
    tableKey?: string;
    hideHeader?: boolean;
    hideReload?: boolean;
    hideColumnConfig?: boolean;
    slot?: React.ReactNode;
    onReload: () => void;
    whiteHeader?: boolean;
  };
  actions?: TableRowActions<T> | null;
}

const ErdaTable = <T extends object>({
  onRow,
  rowKey,
  rowClassName,
  onChange,
  dataSource,
  className,
  columns: columnsSource,
  headerConfig,
  actions,
  ...restTableProps
}: ErdaTableProps<T>) => {
  useErdaIcon();
  const [prefixCls] = usePrefixCls('table');
  const [columns, setColumns] = React.useState(columnsSource);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);
  const [sortColumn] = React.useState<SorterResult<T>>({}); // TODO

  React.useEffect(() => {
    const _columns = columnsSource.map(
      ({
        width = 300,
        sorter,
        title,
        // render,
        // icon,
        align,
        dataIndex,
        ...restColumnProps
      }) => {
        // const dataIndex = transformDataIndex(_dataIndex);
        // const _columnConfig = columnsConfig.current[dataIndex] || { dataIndex, hidden: !!hidden };
        // _columnsConfig[dataIndex] = _columnConfig;

        // const { subTitle } = args;
        // let sortTitle;
        // if (sorter) {
        //   sortTitle = (
        //     <Dropdown
        //       trigger={['click']}
        //       overlay={sorterMenu({ ...args, title, sorter, dataIndex })}
        //       align={{ offset: [0, 5] }}
        //       overlayClassName="erda-table-sorter-overlay"
        //       placement={align === 'right' ? 'bottomRight' : 'bottomLeft'}
        //       getPopupContainer={() => containerRef.current}
        //     >
        //       <span
        //         className={`cursor-pointer erda-table-sorter flex items-center ${(align && alignMap[align]) || ''}`}
        //       >
        //         {typeof title === 'function' ? title({ sortColumn: sort?.column, sortOrder: sort?.order }) : title}
        //         <span className={`sorter-icon pl-1 ${(sort.columnKey === args.dataIndex && sort.order) || ''}`}>
        //           {sort.order && sort.columnKey === args.dataIndex ? (
        //             sortIcon[sort.order]
        //           ) : (
        //             <ErdaIcon type="caret-down" fill="log-font" size={20} className="relative top-0.5" />
        //           )}
        //         </span>
        //       </span>
        //     </Dropdown>
        //   );
        // }

        // let columnRender = render;
        // if (icon || subTitle) {
        //   columnRender = (text: string, record: T, index: number) => {
        //     const displayedText = render ? render(text, record, index) : text;
        //     const subTitleText = typeof subTitle === 'function' ? subTitle(text, record, index) : subTitle;

        //     return (
        //       <div
        //         className={`
        //             erda-table-compose-td flex items-center
        //             ${icon ? 'erda-table-icon-td' : ''}
        //             ${(Object.keys(args).includes('subTitle') && 'double-row') || ''}
        //           `}
        //       >
        //         {icon && (
        //           <span className="erda-table-td-icon mr-1 flex">
        //             {typeof icon === 'function' ? icon(text, record, index) : icon}
        //           </span>
        //         )}
        //         <div className="flex flex-col">
        //           <Ellipsis
        //             title={<span className={onRow && subTitle ? 'erda-table-td-title' : ''}>{displayedText}</span>}
        //             className="leading-4"
        //           />
        //           {Object.keys(args).includes('subTitle') && (
        //             <span className="erda-table-td-subTitle truncate">{subTitleText || '-'}</span>
        //           )}
        //         </div>
        //       </div>
        //     );
        //   };
        // }
        return {
          align,
          title,
          // sortTitle,
          ellipsis: true,
          onCell: () => ({
            style: { maxWidth: width },
            className: cn({ [`${prefixCls}-sort-cell`]: align === 'right' && sorter }),
          }),
          // render: columnRender,
          dataIndex,
          hidden: hiddenColumns.includes(dataIndex as string),
          ...restColumnProps,
        };
      },
    );
    setColumns(_columns);
  }, [columnsSource, hiddenColumns, prefixCls]);

  const onReload = () => {
    if (headerConfig?.onReload) {
      // headerConfig.onReload(current, pageSize);
    } else {
      // const { onChange: onPageChange } = pagination as TablePaginationConfig;
      // onChange?.({ current, pageSize }, {}, sort, { action: 'paginate', currentDataSource: [] });
      // onPageChange?.(current, pageSize);
    }
  };

  return (
    <>
      {!headerConfig?.hideHeader && (
        <TableConfigHeader
          slot={headerConfig?.slot}
          hideColumnConfig={headerConfig?.hideColumnConfig}
          hideReload={headerConfig?.hideReload}
          columns={columns}
          sortColumn={sortColumn}
          setHiddenColumns={setHiddenColumns}
          onReload={onReload}
          whiteHeader={headerConfig?.whiteHeader}
          tableKey={headerConfig?.tableKey}
        />
      )}
      <Table
        rowKey={rowKey}
        scroll={{ x: '100%' }}
        columns={[
          ...columns.filter((item) => !item.hidden).map((item) => ({ ...item, title: item.sortTitle || item.title })),
          ...renderActions(prefixCls, actions),
        ]}
        rowClassName={cn({ 'cursor-pointer': onRow }, rowClassName)}
        size="small"
        pagination={false}
        onChange={onChange}
        dataSource={dataSource ?? []}
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
        className={cn(`${prefixCls}-table`, className)}
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
