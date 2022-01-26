import { useContext } from 'react';
import { ConfigProvider } from 'antd';

// eslint-disable-next-line import/prefer-default-export
export const usePrefixCls = (
  tag?: string,
  props?: {
    prefixCls?: string;
  },
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  return getPrefixCls(tag, props?.prefixCls);
};
