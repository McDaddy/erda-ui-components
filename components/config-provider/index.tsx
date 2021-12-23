import React from 'react';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';

const ConfigProvider = (props: ConfigProviderProps) => {
  const { prefixCls = 'ec', children, ...rest } = props;

  return (
    <AntConfigProvider {...rest} prefixCls={prefixCls}>
      {children}
    </AntConfigProvider>
  );
};

export const { ConfigContext } = AntConfigProvider;
export const ConfigConsumer = AntConfigProvider.ConfigContext.Consumer;

export default ConfigProvider;
