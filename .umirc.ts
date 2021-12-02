import { defineConfig } from 'dumi';

const title = 'Erda UI Components';
const repo = 'erda-ui-components';

export default defineConfig({
  title: repo,
  favicon: '/images/favicon.png',
  logo: '/images/favicon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
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
      path: 'https://github.com/umijs/dumi-template',
    },
  ],
  // more config: https://d.umijs.org/config
});
