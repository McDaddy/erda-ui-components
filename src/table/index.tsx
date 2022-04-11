import React from 'react';
import { Table, TableProps } from 'antd';
import cn from 'classnames';
import { usePrefixCls } from '../_util/hooks';
import { ColumnType } from 'antd/lib/table';
import TableConfigHeader from './table-config-header';
import { useErdaIcon } from '../icon';
import { TableRowActions } from './interface';
import { renderActions } from './utils';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { useSorterMenu } from './sorter';
import TableFooter from './table-footer';
import { PAGINATION } from '../pagination';

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
    onReload?: () => void;
    whiteHeader?: boolean;
  };
  actions?: TableRowActions<T> | null;
}

const ErdaTable = <T extends Obj>({
  onRow,
  rowKey,
  rowClassName,
  onChange,
  dataSource,
  className,
  columns: columnsSource,
  headerConfig,
  actions,
  pagination: paginationProps,
  rowSelection,
  ...restTableProps
}: ErdaTableProps<T>) => {
  useErdaIcon();
  const [prefixCls] = usePrefixCls('table');
  const [columns, setColumns] = React.useState(columnsSource);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState(rowSelection?.selectedRowKeys || []);

  // @ts-ignore TODO
  const [defaultPagination, setDefaultPagination] = React.useState<TablePaginationConfig>({
    current: 1,
    total: dataSource?.length || 0,
    pageSizeOptions: PAGINATION.pageSizeOptions,
    pageSize: (paginationProps as TablePaginationConfig)?.pageSize || PAGINATION.pageSize,
  });
  const isFrontendPaging = !(paginationProps && paginationProps.current) && paginationProps !== false; // Determine whether front-end paging, when current is not passed means this is an uncontrolled component table

  const pagination = React.useMemo(() => {
    return isFrontendPaging ? { ...defaultPagination, ...paginationProps } : paginationProps;
  }, [defaultPagination, isFrontendPaging, paginationProps]);

  // @ts-ignore TODO
  const { current = 1, pageSize = PAGINATION.pageSize } = pagination as TablePaginationConfig;

  const [renderSortTitle, sortConfig, sortCompareRef] = useSorterMenu();

  const getKey = React.useCallback(
    (item: T) => (typeof rowKey === 'function' ? rowKey(item) : item?.[rowKey || 'id']),
    [rowKey],
  );

  // @ts-ignore TODO
  const onTableChange = (params: any) => {};
  // pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<...>[], extra: TableCurrentDataSource<...>
  // const onTableChange = React.useCallback(
  //   ({ pageNo, pageSize: size, sorter: currentSorter }) => {
  //     if (typeof pagination === 'boolean' || !pagination) {
  //       return;
  //     }
  //     const { onChange: onPageChange } = pagination;
  //     const action: TableAction = currentSorter ? 'sort' : 'paginate';
  //     const extra = {
  //       currentDataSource: (action === 'sort' && dataSource) || [],
  //       action,
  //     };

  //     switch (action) {
  //       // case 'paginate':
  //       //   if (isFrontendPaging) {
  //       //     setDefaultPagination({ ...pagination, current: pageNo || current, pageSize: size || pageSize });
  //       //   } else {
  //       //     onPageChange?.(pageNo || current, size || pageSize);
  //       //     onChange?.(
  //       //       { ...pagination, current: pageNo || current, pageSize: size || pageSize },
  //       //       {},
  //       //       currentSorter || sort,
  //       //       extra,
  //       //     );
  //       //   }
  //       //   break;
  //       case 'sort':
  //         if (!sortCompareRef.current) {
  //           onChange?.(
  //             { ...pagination, current: pageNo || current, pageSize: size || pageSize },
  //             {},
  //             currentSorter || sortConfig,
  //             extra,
  //           );
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   [current, dataSource, onChange, pageSize, pagination, sortConfig],
  // );

  // React.useEffect(() => {
  //   if (!sortCompareRef.current) {
  //     onChange?.(
  //       { current, pageSize },
  //       {},
  //       sortConfig,
  //       {
  //         currentDataSource: dataSource as T[] ?? [],
  //         action: 'sort',
  //       },
  //     );
  //   }
  // }, [current, dataSource, onChange, pageSize, sortConfig]);

  React.useEffect(() => {
    const _columns = columnsSource.map((col) => {
      const {
        width = 300,
        sorter,
        title,
        // render,
        // icon,
        align,
        dataIndex,
        ...restColumnProps
      } = col;
      let sortTitle;
      if (sorter) {
        sortTitle = renderSortTitle(col, sortConfig);
      }

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
        sortTitle,
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
    });
    setColumns(_columns);
  }, [columnsSource, hiddenColumns, prefixCls, renderSortTitle, sortConfig]);

  const onReload = () => {
    if (headerConfig?.onReload) {
      // headerConfig.onReload(current, pageSize);
    } else {
      // const { onChange: onPageChange } = pagination as TablePaginationConfig;
      // onChange?.({ current, pageSize }, {}, sort, { action: 'paginate', currentDataSource: [] });
      // onPageChange?.(current, pageSize);
    }
  };

  let data = [...(dataSource ?? [])];

  if (sortCompareRef.current) {
    data = data.sort(sortCompareRef.current);
  }

  return (
    <>
      {!headerConfig?.hideHeader && (
        <TableConfigHeader
          slot={headerConfig?.slot}
          hideColumnConfig={headerConfig?.hideColumnConfig}
          hideReload={headerConfig?.hideReload}
          columns={columns}
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
        dataSource={data ?? []}
        onRow={onRow}
        rowSelection={
          rowSelection
            ? {
                ...rowSelection,
                selectedRowKeys,
                onChange(selectedRowKeyList, selectedRows) {
                  rowSelection.onChange?.(selectedRowKeyList, selectedRows);
                  setSelectedRowKeys(() => selectedRows.map((r) => getKey(r)));
                },
              }
            : undefined
        }
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
      <TableFooter
        // rowKey={rowKey}
        // dataSource={data}
        // onSelectChange={setSelectedRowKeys}
        // rowSelection={{
        //   ...rowSelection,
        //   selectedRowKeys,
        // }}
        pagination={pagination}
        hidePagination={paginationProps === false}
        onTableChange={onTableChange}
        // whiteFooter={whiteFooter}
      />
    </>
  );
};

export default ErdaTable;
