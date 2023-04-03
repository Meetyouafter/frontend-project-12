import filter from 'leo-profanity';
import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import ru from './dictionary/ru.json';
import en from './dictionary/en.json';

const resources = {
  ru,
  en,
};

const language = localStorage.getItem('language') || 'ru';

i18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    interpolation: {
      escapeValue: false,
    },
  });

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const swearsFilter = (word) => filter.clean(word);

export default i18n;
export { swearsFilter };
