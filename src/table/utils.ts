export interface ColumnsConfig {
  [key: string]: {
    dataIndex: string;
    hidden: boolean;
  };
}

export const getLsColumnsConfig = (key: string): ColumnsConfig => {
  const str = localStorage.getItem(`table-key-${key}`);
  return str ? JSON.parse(str) : {};
};

// TODO consider different user use same PC condition
export const saveLsColumnsConfig = (key: string, config: ColumnsConfig) => {
  localStorage.setItem(`table-key-${key}`, JSON.stringify(config));
};

// due to dataIndex could be number | string | string[] | number[], to store it as key then should convert it to string
export const transformDataIndex = (dataIndex: string | number | ReadonlyArray<string | number> | undefined): string => {
  if (!dataIndex) {
    // eslint-disable-next-line no-console
    console.warn('dataIndex is required');
    return '-';
  }
  if (typeof dataIndex === 'number') {
    return `${dataIndex}`;
  }
  if (Array.isArray(dataIndex)) {
    return dataIndex.map((item) => `${item}`).join('-');
  }
  return dataIndex as string;
};
