import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      foreground: string;
      background: string;
      header: {
        background: string;
      };
      content: {
        background: string;
      };
      navigation: {
        background: string;
        itemHoveredBackground: string;
      };
    };
  }
}

const defaultBackground = '#2c3136';

const theme: DefaultTheme = {
  colors: {
    primary: '#0CB7F5',
    foreground: '#fff',
    background: defaultBackground,
    header: {
      background: '#171a1c',
    },
    navigation: {
      background: '#24282c',
      itemHoveredBackground: '#1c1f22',
    },
    content: {
      background: defaultBackground,
    },
  },
};

export { theme };
