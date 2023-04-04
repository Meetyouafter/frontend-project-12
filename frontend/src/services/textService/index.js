import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import ru from './dictionary/ru';
import en from './dictionary/en';

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
    debug: false,
  });

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const swearsFilter = (word) => filter.clean(word);

export default i18n;
export { swearsFilter };
