import React from 'react';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { ConfigProviderProps, ConfigConsumerProps } from 'antd/es/config-provider';
import defaultRenderEmpty from './renderEmpty';

const ConfigProvider = (props: ConfigProviderProps) => {
  const { prefixCls = 'ec', children, ...rest } = props;

  return (
    <AntConfigProvider {...rest} prefixCls={prefixCls}>
      {children}
    </AntConfigProvider>
  );
};

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ec-${suffixCls}` : 'ec';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,

  renderEmpty: defaultRenderEmpty,
});

// export const { ConfigContext } = AntConfigProvider;
export const ConfigConsumer = AntConfigProvider.ConfigContext.Consumer;

export default ConfigProvider;
