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
