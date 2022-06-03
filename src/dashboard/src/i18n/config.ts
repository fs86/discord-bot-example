import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import guildSettings from './de/guildSettings.json';
import home from './de/home.json';
import landingPage from './de/landingPage.json';
import notFound from './de/notFound.json';
import notImplemented from './de/notImplemented.json';

export const resources = {
  de: {
    guildSettings,
    home,
    landingPage,
    notFound,
    notImplemented,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'de',
  ns: ['guildSettings', 'home', 'landingPage', 'notFound', 'notImplemented'],
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
