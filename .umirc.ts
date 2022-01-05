import { defineConfig } from 'dumi';
import path from 'path';

const title = 'Erda UI Components';
const repo = 'erda-ui-components';

export default defineConfig({
  title,
  favicon: '/images/favicon.png',
  logo: '/images/favicon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  alias: {
    'erda-ui-components': path.resolve(__dirname, 'components/index.tsx'),
  },
  resolve: {
    includes: ['docs', 'components'],
  },
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/McDaddy/erda-ui-components',
    },
  ],
  extraBabelPlugins: [
    ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ['babel-plugin-import', { libraryName: '@formily/antd', libraryDirectory: 'esm', style: true }, '@formily/antd'],
  ],
  // theme: {
  //   '@ant-prefix': 'ec',
  // },
  // webpack5: { lazyCompilation: {} },
  lessLoader: {
    javascriptEnabled: true,
    modifyVars: { '@ant-prefix': 'ec', '@primary-color': '#6A549E' },
  },
  // more config: https://d.umijs.org/config
});
