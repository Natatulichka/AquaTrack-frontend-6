import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uk from './locales/uk/translation.json';
import en from './locales/en/translation.json';
import de from './locales/de/translation.json';

const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
  de: {
    translation: de,
  },
};
const savedLanguage = localStorage.getItem('language') || 'en';
i18n.use(initReactI18next).init({
  resources,
  interpolation: {
    escapeValue: false,
  },
  lng: savedLanguage,
  ns: ['translation'],
  defaultNS: 'translation',
  debug: true,
});
export default i18n;
