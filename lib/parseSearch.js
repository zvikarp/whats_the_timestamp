const wantsTimestampNowTexts = [
  "timestamp",
  "what is the timestamp",
  "whats the timestamp",
  "current timestamp",
  "timestamp now",
];

const wantsDatetimeNowTexts = [
  "datetime",
  "what is the datetime",
  "whats the datetime",
  "current datetime",
  "datetime now",
];

const wantsToConvertTimestampPrefixs = ["convert", ""];

const wantsToConvertTimestampSuffixs = ["to datetime", "in datetime", ""];

const searchTextParses = {
  timestamp_now: wantsTimestampNow,
  dateTime_now: wantsDatetimeNow,
  convert_timestamp: wantsToConvertTimestamp,
};

function textIncludes(list, text) {
  for (item of list) {
    if (getEditDistanceAlgorithm(item, text.toLowerCase()) < 2) return true;
  }
  return false;
}

function wantsTimestampNow(text) {
  return textIncludes(wantsTimestampNowTexts, text);
}

function wantsDatetimeNow(text) {
  return textIncludes(wantsDatetimeNowTexts, text);
}

function wantsToConvertTimestamp(text) {
  const { index, timestamp } = containsTimestamp(text);
  const textPrefix = text.split(" ").slice(0, index).join(" ");
  const textSuffix = text
    .split(" ")
    .slice(index + 1)
    .join(" ");
  if (
    timestamp &&
    textIncludes(wantsToConvertTimestampPrefixs, textPrefix) &&
    textIncludes(wantsToConvertTimestampSuffixs, textSuffix)
  )
    return timestamp;
}

function searchTextToCode(text) {
  const decodeText = percentDecode(text);
  for (parserFunc in searchTextParses) {
    const parserResult = searchTextParses[parserFunc](decodeText);
    if (parserResult) return { parserFunc, parserResult };
  }
}

function percentDecode(text) {
  return decodeURIComponent(text);
}
