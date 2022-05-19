import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
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
    secondary: '#0CA798',
    foreground: '#fff',
    background: defaultBackground,
    header: {
      background: '#171a1c',
    },
    navigation: {
      background: '#24282c',
      itemHoveredBackground: '#15181a',
    },
    content: {
      background: defaultBackground,
    },
  },
};

export { theme };
