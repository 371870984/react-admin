const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, tap } = require('customize-cra');
const theme = require('./modifyVars');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  }),
  addDecoratorsLegacy(),
  // tap({ dest: 'customize-cra.log' })
);
