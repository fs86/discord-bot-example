const CracoAlias = require('craco-alias');
const CracoLess = require('craco-less');

// Compile TypeScript with Babel:
// https://blog.johnnyreilly.com/2021/01/02/create-react-app-with-ts-loader-and-craco

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
