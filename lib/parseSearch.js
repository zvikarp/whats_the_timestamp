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

function wantsTimestampNow(text) {
  return wantsTimestampNowTexts.includes(text.toLowerCase());
}

function wantsDatetimeNow(text) {
  return wantsDatetimeNowTexts.includes(text.toLowerCase());
}

function wantsToConvertTimestamp(text) {
  const { index, timestamp } = containsTimestamp(text);
  textPrefix = text.split(" ").slice(0, index).join(" ").toLowerCase();
  textSuffix = text
    .split(" ")
    .slice(index + 1)
    .join(" ")
    .toLowerCase();
  if (
    timestamp &&
    wantsToConvertTimestampPrefixs.includes(textPrefix) &&
    wantsToConvertTimestampSuffixs.includes(textSuffix)
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
