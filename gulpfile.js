const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const merge2 = require('merge2');
const webpack = require('webpack');
const { compilerOptions } = require('./tsconfig.json');

const tsConfig = {
  noUnusedParameters: true,
  noUnusedLocals: true,
  strictNullChecks: true,
  target: 'es6',
  jsx: 'react',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
  ...compilerOptions,
};
const babelConfig = require('./babel.config');

const source = ['components/**/*.{js,ts,jsx,tsx}', '!components/**/e2e/*', '!components/**/unit/*'];
const base = path.join(process.cwd(), 'components');
function getProjectPath(filePath) {
  return path.join(process.cwd(), filePath);
}
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

gulp.task('compile-with-es', (done) => {
  console.log('Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', (done) => {
  console.log('Compile to lib...');
  compile().on('finish', done);
});
gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));

function compile(modules) {
  const targetDir = modules === false ? esDir : libDir;
  rimraf.sync(targetDir);
  const { js, dts } = gulp.src(source, { base }).pipe(ts(tsConfig));
  const dtsFilesStream = dts.pipe(gulp.dest(targetDir));
  let jsFilesStream = js;
  if (modules !== false) {
    jsFilesStream = js.pipe(babel(babelConfig));
  }
  jsFilesStream = jsFilesStream.pipe(gulp.dest(targetDir));
  return merge2([jsFilesStream, dtsFilesStream]);
}

function dist(done) {
  rimraf.sync(getProjectPath('dist'));
  process.env.RUN_ENV = 'PRODUCTION';
  const webpackConfig = require(getProjectPath('webpack.config.js'));
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();
    const { dist: { finalize } = {}, bail } = getConfig();

    if (stats.hasErrors()) {
      (info.errors || []).forEach((error) => {
        console.error(error);
      });
      // https://github.com/ant-design/ant-design/pull/31662
      if (bail) {
        process.exit(1);
      }
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false,
    });
    console.log(buildInfo);

    // Additional process of dist finalize
    if (finalize) {
      console.log('[Dist] Finalization...');
      finalize();
    }

    done(0);
  });
}
