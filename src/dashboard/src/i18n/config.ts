import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import guildSelectionDialog from './de/guildSelectionDialog.json';
import guildSettingsPage from './de/guildSettingsPage.json';
import landingPage from './de/landingPage.json';
import notFound from './de/notFound.json';
import notImplemented from './de/notImplemented.json';
import overviewPage from './de/overviewPage.json';

export const resources = {
  de: {
    guildSelectionDialog,
    guildSettingsPage,
    overviewPage,
    landingPage,
    notFound,
    notImplemented,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'de',
  ns: [
    'guildSelectionDialog',
    'guildSettingsPage',
    'overviewPage',
    'landingPage',
    'notFound',
    'notImplemented',
  ],
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
