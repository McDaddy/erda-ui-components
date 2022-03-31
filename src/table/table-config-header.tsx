import React from 'react';
import { Checkbox, Popover } from 'antd';
import ErdaIcon from '../icon';
import { ErdaColumnType } from '.';
import { SorterResult } from 'antd/lib/table/interface';
// import { TableConfigProps, ColumnProps } from './interface';

export interface TableConfigProps<T> {
  slot?: React.ReactNode;
  columns: Array<ErdaColumnType<T>>;
  setColumns: (val: Array<ErdaColumnType<T>>) => void;
  onReload: () => void;
  sortColumn: SorterResult<T>;
  hideReload?: boolean;
  hideColumnConfig?: boolean;
  whiteHead?: boolean;
}

function TableConfigHeader<T extends Record<string, any>>({
  slot,
  columns,
  setColumns,
  onReload,
  sortColumn,
  hideColumnConfig = false,
  hideReload = false,
  whiteHead,
}: TableConfigProps<T>) {
  const { column, order } = sortColumn;

  const onCheck = (checked: boolean, title: string) => {
    const newColumns = columns.map((item) => (item.title === title ? { ...item, hidden: !checked } : item));
    setColumns(newColumns);
  };

  const showLength = columns.filter((item) => !item.hidden).length;
  const columnsFilter = columns
    .filter((item) => item.title && item.dataIndex)
    .map((item: ErdaColumnType<T>) => (
      <div key={`${item.dataIndex}`}>
        <Checkbox
          className="whitespace-nowrap"
          checked={!item.hidden}
          onChange={(e) => onCheck(e.target.checked, item.title as string)}
          disabled={showLength === 1 && !item.hidden}
        >
          {typeof item.title === 'function' ? item.title({ sortColumn: column, sortOrder: order }) : item.title}
        </Checkbox>
      </div>
    ));

  return (
    <div className={`erda-table-filter flex justify-between ${whiteHead ? 'bg-white' : 'bg-default-02'}`}>
      <div className="erda-table-filter-content flex-1 flex items-center">
        <div className="flex-1">{slot}</div>
      </div>
      <div className="erda-table-filter-ops flex items-center">
        {!hideReload ? (
          <ErdaIcon
            size="20"
            className={`icon-hover ml-3 bg-hover p-1`}
            type="refresh"
            color="currentColor"
            onClick={onReload}
          />
        ) : null}
        {!hideColumnConfig ? (
          <Popover
            content={columnsFilter}
            trigger="click"
            placement="bottomRight"
            overlayClassName="erda-table-columns-filter"
            getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
          >
            <ErdaIcon type="config" size="20" className={`ml-3 icon-hover bg-hover p-1`} />
          </Popover>
        ) : null}
      </div>
    </div>
  );
}

export default TableConfigHeader;
