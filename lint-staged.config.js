module.exports = {
  '*.{ts,tsx}': 'eslint --cache --fix --max-warnings=0',
  '**/*.ts?(x)': () => 'tsc --noEmit',
};
