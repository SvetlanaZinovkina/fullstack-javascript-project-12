import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRU from './locales/ru.js';

const resources = {
  ru: { translation: translationRU },
};

const options = {
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
};
const i18n = i18next.createInstance();
i18n
  .use(initReactI18next)
  .init(options);

export default i18n;
