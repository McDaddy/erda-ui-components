export interface ColumnsConfig {
  [key: string]: {
    dataIndex: string;
    hidden: boolean;
  };
}

export interface RowAction {
  title: string;
  onClick: () => void;
  show?: boolean;
  disabled?: boolean;
  disabledTip?: string;
}

export interface TableRowActions<T> {
  width?: number | string;
  /**
   * (record: T) => IAction[]
   *
   * interface IAction {
   *   title: string;
   *   onClick: () => void;
   * }
   */
  render: (record: T) => RowAction[];
  /**
   * Limit the number of displays
   */
  limitNum?: number;
}
