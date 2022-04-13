import React from 'react';
import { Dropdown, Menu } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import ErdaIcon from '../icon';
import { usePrefixCls } from '../_util/hooks';
import { ErdaColumnType } from '.';
import { SortOrder } from './interface';
import cn from 'classnames';

const sortIcon = {
  ascend: <ErdaIcon type="shengxu" size={16} />,
  descend: <ErdaIcon type="jiangxu" size={16} />,
};

export const useSorterMenu = <T extends object>() => {
  const [sortConfig, setSortConfig] = React.useState<SorterResult<T>>({});
  const sortCompareRef = React.useRef<((a: T, b: T) => number) | null>(null);
  const [prefixCls] = usePrefixCls('table');

  const alignMap = React.useMemo(
    () => ({
      center: `${prefixCls}-justify-center`,
      left: `${prefixCls}-justify-start`,
      right: `${prefixCls}-justify-end`,
    }),
    [prefixCls],
  );

  const onSort = React.useCallback((column: ErdaColumnType<T>, order?: SortOrder) => {
    const sorter = {
      column,
      columnKey: column.dataIndex,
      field: column.dataIndex,
    } as SorterResult<T>;
    setSortConfig({ ...sorter, order });
    const { sorter: columnSorter } = column;

    if (order && typeof columnSorter === 'function') {
      // eslint-disable-next-line no-param-reassign
      sortCompareRef.current = (a: T, b: T) => {
        if (order === 'ascend') {
          return columnSorter(a, b);
        } else {
          return columnSorter(b, a);
        }
      };
    } else if (
      order &&
      columnSorter &&
      typeof columnSorter !== 'boolean' &&
      'compare' in columnSorter &&
      columnSorter.compare
    ) {
      // eslint-disable-next-line no-param-reassign
      sortCompareRef.current = (a: T, b: T) => {
        if (order === 'ascend') {
          return columnSorter.compare!(a, b);
        } else {
          return columnSorter.compare!(b, a);
        }
      };
    } else {
      // eslint-disable-next-line no-param-reassign
      sortCompareRef.current = null;
    }
  }, []);

  const menuRender = React.useCallback(
    (column: ErdaColumnType<T>) => {
      return (
        <Menu>
          <Menu.Item key={'0'} onClick={() => onSort(column)}>
            <span className={`${prefixCls}-menu-item`}>取消排序</span>
          </Menu.Item>
          <Menu.Item key={'ascend'} onClick={() => onSort(column, 'ascend')}>
            <span className={`${prefixCls}-menu-item`}>
              <ErdaIcon type="shengxu" className={`${prefixCls}-menu-icon`} />
              {'升序'}
            </span>
          </Menu.Item>
          <Menu.Item key={'descend'} onClick={() => onSort(column, 'descend')}>
            <span className={`${prefixCls}-menu-item`}>
              <ErdaIcon type="jiangxu" className={`${prefixCls}-menu-icon`} />
              {'降序'}
            </span>
          </Menu.Item>
        </Menu>
      );
    },
    [onSort, prefixCls],
  );

  const renderSortTitle = React.useCallback(
    (column: ErdaColumnType<T>, _sortConfig: SorterResult<T>) => {
      const { title, align, dataIndex } = column;

      return (
        <Dropdown
          trigger={['click']}
          overlay={menuRender(column)}
          align={{ offset: [0, 5] }}
          overlayClassName={`${prefixCls}-sorter-overlay`}
          placement={align === 'right' ? 'bottomRight' : 'bottomLeft'}
          getPopupContainer={() => document.body}
        >
          <span className={cn(`${prefixCls}-sorter`, align ? alignMap[align] : undefined)}>
            {typeof title === 'function' ? title({}) : title}
            <span className={cn(`${prefixCls}-sorter-icon`)}>
              {_sortConfig.order && _sortConfig.columnKey === dataIndex ? (
                sortIcon[_sortConfig.order]
              ) : (
                <ErdaIcon type="caret-down" size={16} className={cn(`${prefixCls}-sorter-icon-content`)} />
              )}
            </span>
          </span>
        </Dropdown>
      );
    },
    [alignMap, menuRender, prefixCls],
  );

  return [renderSortTitle, sortConfig, sortCompareRef] as [
    (column: ErdaColumnType<T>, _sortConfig: SorterResult<T>) => JSX.Element,
    SorterResult<T>,
    React.MutableRefObject<((a: T, b: T) => number) | null>,
  ];
};
