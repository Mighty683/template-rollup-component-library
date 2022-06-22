module.exports = {
  jsxSingleQuote: true,
  semi: true,
  singleQuote: true,
  importOrder: [
    'react',
    '<THIRD_PARTY_MODULES>',
    '^src/(.*)$',
    '^[../]',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
