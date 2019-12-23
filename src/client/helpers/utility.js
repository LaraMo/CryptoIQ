export function validateVocabularyPayload(data) {
  const {maxNumberOfWords, words} = data;

  if (!_.isArray(words)) {
    throw `Invalid info: words is not an array`;
  } else if (maxNumberOfWords != words.length) {
    throw `Invalid info: words array does not match count`;
  } else {
    words.forEach(word => {
      if (!'wordsEntered' in word) {
        throw `Missing info: wordsEntered`;
      }

      if (!'pageNumberEntered' in word) {
        throw `Missing info: pageNumberEntered`;
      }

      if (!'definitionsEntered' in word) {
        throw `Missing info: definitionsEntered`;
      }
    });
  }
}

export function validateStorylinePayload(data) {
  const {title, opening, quest, ending, difficultyLevel} = data;
  if (!title) {
    throw `Missing info: title`;
  }
  if (!opening) {
    throw `Missing info: opening`;
  }
  if (!quest) {
    throw `Missing info: quest`;
  }
  if (!ending) {
    throw `Missing info: ending`;
  }

  if (!difficultyLevel) {
    throw `Missing info: difficultyLevel`;
  }
  let actionTypes = extractActions(data);
  let minActionCount = 2;
  if (actionTypes.length < minActionCount) {
    throw `Missing actions. Need at least ${minActionCount} actions`;
  }
}

export function validateForm(data) {
    const {storyline, vocabulary} = data;
    validateStorylinePayload(storyline);
    validateVocabularyPayload(vocabulary);
}