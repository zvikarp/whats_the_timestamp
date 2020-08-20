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

const searchTextParses = {
  timestamp_now: wantsTimestampNow,
  dateTime_now: wantsDatetimeNow,
};

function wantsTimestampNow(text) {
  return wantsTimestampNowTexts.includes(text.toLowerCase());
}

function wantsDatetimeNow(text) {
  return wantsDatetimeNowTexts.includes(text.toLowerCase());
}

function searchTextToCode(text) {
  const decodeText = percentDecode(text);
  for (parserFunc in searchTextParses) {
    if (searchTextParses[parserFunc](decodeText)) return parserFunc;
  }
}

function percentDecode(text) {
  return decodeURIComponent(text);
}
