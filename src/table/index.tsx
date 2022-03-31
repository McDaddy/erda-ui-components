import React from 'react';
import { Table, TableProps } from 'antd';
import cn from 'classnames';
import { usePrefixCls } from '../_util/hooks';
import { ColumnType } from 'antd/lib/table';
import TableConfigHeader from './table-config-header';
import { SorterResult } from 'antd/lib/table/interface';
import { ColumnsConfig, getLsColumnsConfig, saveLsColumnsConfig, transformDataIndex } from './utils';
import { useErdaIcon } from 'src/icon';

export interface ErdaColumnType<T> extends ColumnType<T> {
  subTitle?: ((text: string, record: T, index: number) => React.ReactNode) | React.ReactNode;
  icon?: ((text: string, record: T, index: number) => React.ReactNode) | React.ReactNode;
  hidden?: boolean;
  sortTitle?: React.ReactNode;
}

export interface ErdaTableProps<T = unknown> extends TableProps<T> {
  tableKey?: string;
  columns: Array<ErdaColumnType<T>>;
  headerConfig?: {
    hideHeader?: boolean;
    hideReload?: boolean;
    hideColumnConfig?: boolean;
    slot?: React.ReactNode;
    onReload: () => void;
    whiteHead?: boolean;
  };
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
  tableKey,
  ...restTableProps
}: ErdaTableProps<T>) => {
  useErdaIcon();
  const prefixCls = usePrefixCls();
  const [columns, setColumns] = React.useState(columnsSource);
  const [sortColumn, setSortColumn] = React.useState<SorterResult<T>>({}); // TODO
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: index.tsx ~ line 48 ~ setSortColumn', setSortColumn);
  const columnsConfig = React.useRef(tableKey ? getLsColumnsConfig(tableKey) : {});

  React.useEffect(() => {
    const _columnsConfig: ColumnsConfig = {};
    const _columns = columnsSource.map(
      ({
        width = 300,
        sorter,
        title,
        // render,
        // icon,
        align,
        dataIndex: _dataIndex,
        hidden = false,
        ...restColumnProps
      }) => {
        const dataIndex = transformDataIndex(_dataIndex);
        const _columnConfig = columnsConfig.current[dataIndex] || { dataIndex, hidden: !!hidden };
        _columnsConfig[dataIndex] = _columnConfig;

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
          onCell: () => ({ style: { maxWidth: width }, className: align === 'right' && sorter ? 'pr-8' : '' }),
          // render: columnRender,
          dataIndex,
          ...restColumnProps,
          hidden: _columnConfig.hidden,
        };
      },
    );

    columnsConfig.current = _columnsConfig;
    setColumns(_columns);
    tableKey && saveLsColumnsConfig(tableKey, _columnsConfig);
  }, [columnsSource, tableKey]);

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
          setColumns={(val) => {
            val.forEach((col) => {
              columnsConfig.current[col.dataIndex as string].hidden = !!col.hidden;
            });

            tableKey && saveLsColumnsConfig(tableKey, columnsConfig.current);
            setColumns(val);
          }}
          onReload={onReload}
          whiteHead={headerConfig?.whiteHead}
        />
      )}
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
