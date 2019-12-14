import _ from 'lodash';

export const generalInfoKey = 'generalInfo';
export const vocalbularyKEy = 'vocalbulary';
export const storylineKey = 'storyline';

export function getLatestGameData() {
  return {
    [generalInfoKey]: getItem(generalInfoKey),
    [vocalbularyKEy]: getItem(vocalbularyKEy),
    [storylineKey]: getItem(storylineKey),
  }
}

export function storeItem(key, item) {
  if (key && item) {
    if(_.isArray(item) || _.isObject(item)) {
      item = JSON.stringify(item);
    }
    localStorage.setItem(key, item);
  } else {
    throw new Error('Invalid input: ', key, item);
  }
}

export function getItem(key) {
  return localStorage.getItem(key) || {};
}
