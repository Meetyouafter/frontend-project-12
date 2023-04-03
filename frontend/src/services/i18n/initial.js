import i18n from 'i18next';
//  import ICU from 'i18next-icu';
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
    debug: false,
    lng: language,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
