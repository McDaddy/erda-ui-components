import { useContext } from 'react';
import { ConfigProvider } from 'antd';

export const usePrefixCls = (
  tag?: string,
  props?: {
    prefixCls?: string;
  },
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  return getPrefixCls(tag, props?.prefixCls);
};

export const useLocale = () => {
  const { locale } = useContext(ConfigProvider.ConfigContext);
  console.log('🚀 ~ file: hooks.ts ~ line 16 ~ useLocale ~ locale', locale);
  return locale?.locale;
};
