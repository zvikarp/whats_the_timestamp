function isValidTimestamp(text) {
  return new Date(parseInt(text)).getTime() > 0;
}

function containsTimestamp(text) {
  const words = text.split(" ");
  for (index in words) {
    if (isValidTimestamp(words[index]))
      return {
        index: parseInt(index),
        timestamp: new Date(parseInt(words[index])).getTime(),
      };
  }
  return false;
}

function isValidHumanDate(text) {
  const date = Sugar.Date.create(text, { fromUTC: true });
  return isValidDate(date) ? date : false;
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}
