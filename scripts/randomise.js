const pg = require('phrase-generator');
const _ = require('lodash');

const months = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'novemeber', 'december'];

const regex = new RegExp(['[0-9]', ' ', ','].concat(months).join('|'), 'g');

const removeNumsDatesCommasSpaces = phrase => {
  return phrase.toLowerCase().replace(regex, '');
};

const randomise = phrases => {
  const phraseMap = {};
  return phrases
    .map(removeNumsDatesCommasSpaces)
    .map(phrase => phraseMap[phrase] || (phraseMap[phrase] = pg.generate()))
    .map(newPhrase => `${_.random(0, 9999)} ${newPhrase}`);
};

module.exports = randomise;
