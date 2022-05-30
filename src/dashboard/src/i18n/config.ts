import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import guildSettings from './de/guildSettings.json';
import home from './de/home.json';
import landingPage from './de/landingPage.json';
import notFound from './de/notFound.json';

export const resources = {
  de: {
    notFound,
    guildSettings,
    home,
    landingPage,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'de',
  ns: ['notFound', 'guildSettings', 'home', 'landingPage'],
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
