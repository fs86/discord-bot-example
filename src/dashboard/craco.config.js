const CracoAlias = require('craco-alias');

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
  ],
};
