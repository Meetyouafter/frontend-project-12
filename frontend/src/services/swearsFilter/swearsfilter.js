import filter from 'leo-profanity';

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const swearsFilter = (word) => filter.clean(word);

export default swearsFilter;
