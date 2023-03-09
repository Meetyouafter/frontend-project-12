import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './resources/ru.json';
import en from './resources/en.json';

const resources = {
  ru,
  en,
};

const language = localStorage.getItem('language') || 'ru';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

export default i18n;
