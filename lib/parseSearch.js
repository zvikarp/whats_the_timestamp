const wantsToConvertTimestampPrefixs = ["convert", ""];

const wantsToConvertTimestampSuffixs = ["to datetime", "in datetime", ""];

const regexs = [
  {
    func: renderTimestampComponent,
    args: { isNow: true },
    regex: new RegExp(
      /((?<=((what is|whats|current|utc).*))|(^))(timestamp)((?=(.*(utc|now)))|$)/gim
    ),
  },
  {
    func: renderDatetimeComponent,
    args: { isNow: true },
    regex: new RegExp(
      /((?<=((what is|whats|current|utc).*))|(^))(datetime|date time)((?=(.*(utc|now)))|$)/gim
    ),
  },
  {
    func: renderDatetimeComponent,
    args: { isNow: false },
    regex: new RegExp(
      /((?<=(convert|time|date)))\s*(\d*)((?=(.*(time|date)))|$)/gim
    ),
  },
  {
    func: renderTimestampComponent,
    validateFunc: isValidHumanDate,
    args: { isNow: false },
    regex: new RegExp(
      /(?<=(timestamp))(.*?)((?=(timestamp|in timestamp)|$))/gim
    ),
  },
];

function searchTextToCode(text) {
  const decodeText = decodeURIComponent(text);
  for (regex of regexs) {
    const regexResult = regex.regex.exec(decodeText) || [];
    if (regexResult.length > 0) {
      const text = regex.validateFunc
        ? regex.validateFunc(regexResult[0])
        : regexResult[0];
      if (text.trim()) {
        return { func: regex.func, text: text, args: regex.args };
      }
    }
  }
  return false;
}
