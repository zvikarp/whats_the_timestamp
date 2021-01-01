function bannerComponent() {
  const banner = document.createElement("div");
  banner.innerHTML =
    "Created with 🍌 by <a href='https://github.com/zvikarp/whats_the_timestamp'>Zvi Karp</a>.";
  Object.assign(banner.style, {
    borderTop: "1px solid #dfe1e5",
    fontSize: "12px",
    color: "#70757A",
    padding: "12px 24px",
    textAlign: "left",
    direction: "ltr",
  });
  return banner;
}

function clipboardComponent(clipboardText) {
  const copyToclickboard = document.createElement("div");
  copyToclickboard.innerHTML = "📋";
  copyToclickboard.onclick = function () {
    textToClipboard(clipboardText);
  };
  Object.assign(copyToclickboard.style, {
    position: "absolute",
    cursor: "pointer",
    top: "12px",
    right: "12px",
    textAlign: "left",
    direction: "ltr",
  });
  return copyToclickboard;
}

function baseResultComponent(childrenComponents, clipboardText) {
  const result = document.createElement("div");
  Object.assign(result.style, {
    padding: "24px",
    position: "relative",
    textAlign: "left",
    direction: "ltr",
  });
  if (clipboardText) {
    const copyToclickboard = clipboardComponent(clipboardText);
    result.appendChild(copyToclickboard);
  }
  childrenComponents.forEach((child) => {
    result.appendChild(child);
  });
  return result;
}

function pComponent(text) {
  const p = document.createElement("div");
  p.innerHTML = text;
  Object.assign(p.style, {
    fontSize: "14px",
    color: "#70757A",
    paddingBottom: "6px",
    textAlign: "left",
    direction: "ltr",
  });
  return p;
}

function h1Component(text) {
  const h1 = document.createElement("div");
  h1.innerHTML = text;
  Object.assign(h1.style, {
    fontSize: "32px",
    color: "#222",
    textAlign: "left",
    direction: "ltr",
  });
  return h1;
}

function converterComponent(resultComponent) {
  const converter = document.createElement("div");
  Object.assign(converter.style, {
    width: "652px",
    marginBottom: "24px",
    borderRadius: "8px",
    border: "1px solid #dfe1e5",
    textAlign: "left",
    direction: "ltr",
  });
  converter.appendChild(resultComponent);
  converter.appendChild(bannerComponent());
  return converter;
}

function renderTimestampComponent(date, args) {
  const { isNow } = args;
  const displayTimestamp = isNow ? Date.now() : Date.parse(date);
  const displayDate = isNow
    ? "The current date"
    : `The date ${formatDatetime(date)}`;

  const resultComponent = baseResultComponent(
    [
      pComponent(`${displayDate} in milliseconds:`),
      h1Component(displayTimestamp.toString()),
      pComponent(`(and ${parseInt(displayTimestamp / 1000)} in seconds).`),
    ],
    displayTimestamp
  );
  return converterComponent(resultComponent);
}

function renderDatetimeComponent(timestamp, args) {
  const { isNow } = args;
  const displayDate = formatDatetime(
    isNow ? new Date() : new Date(parseInt(timestamp))
  );
  const displayTimestamp = isNow
    ? "The current timestamp"
    : `The timestamp ${timestamp}`;

  const resultComponent = baseResultComponent(
    [
      pComponent(`${displayTimestamp} in dateTime (UTC) is:`),
      h1Component(displayDate.toString()),
    ],
    displayDate
  );
  return converterComponent(resultComponent);
}
