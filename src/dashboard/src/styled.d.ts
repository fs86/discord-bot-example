import { CSSProp } from 'styled-components';

declare module 'react' {
  // eslint-disable-next-line no-unused-vars
  interface Attributes {
    css?: CSSProp<unknown>;
  }
}
