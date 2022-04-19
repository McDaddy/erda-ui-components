// .dumi/theme/layout.tsx(本地主题) 或 src/layout.tsx(主题包)
import React from 'react';
import Layout from 'dumi-theme-default/es/layout';
import { ConfigProvider } from 'erda-ui-components';
import { ConfigProvider as AntConfigProvider } from 'antd';
import zhCN from 'erda-ui-components/lib/locale/zh_CN';
// import enUS from 'erda-ui-components/lib/locale/en_US';
import antZhCN from 'antd/lib/locale/zh_CN';

export default ({ children, ...props }) => {
  return (
    <Layout {...props}>
      <AntConfigProvider locale={antZhCN}>
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
      </AntConfigProvider>
    </Layout>
  );
};
