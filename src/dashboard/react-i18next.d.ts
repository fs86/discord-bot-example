import { resources } from './src/i18n/config';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['de'];
  }
}
