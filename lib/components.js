function bannerComponent() {
  const banner = document.createElement("div");
  banner.innerHTML =
    "Created with 🍌 by <a href='https://github.com/zvikarp/whats_the_timestamp'>Zvi Karp</a>.";
  Object.assign(banner.style, {
    borderTop: "1px solid #dfe1e5",
    fontSize: "12px",
    color: "#70757A",
    padding: "12px 24px",
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
  });
  return copyToclickboard;
}

function baseResultComponent(childrenComponents, clipboardText) {
  const result = document.createElement("div");
  Object.assign(result.style, { padding: "24px", position: "relative" });
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
  });
  return p;
}

function h1Component(text) {
  const h1 = document.createElement("div");
  h1.innerHTML = text;
  Object.assign(h1.style, {
    fontSize: "32px",
    color: "#222",
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
  });
  converter.appendChild(resultComponent);
  converter.appendChild(bannerComponent());
  return converter;
}

function renderTimestampComponent(datetime) {
  const now = Date.now();

  const resultComponent = baseResultComponent(
    [
      pComponent("The corrent timestamp in milliseconds:"),
      h1Component(now.toString()),
      pComponent(`( and ${parseInt(now/1000)} in seconds).`),
    ],
    now
  );
  return converterComponent(resultComponent);
}

function renderDatetimeComponent(timestamp) {
  const datetime = isValidTimestamp(timestamp)
    ? new Date(parseInt(timestamp))
    : new Date();

  const displayableDatetime = formatDatetime(datetime);

  const resultComponent = baseResultComponent(
    [
      pComponent(
        isValidTimestamp(timestamp)
          ? `The timestamp ${timestamp} in dateTime (UTC) is:`
          : "The corrent dateTime (UTC) is:"
      ),
      h1Component(displayableDatetime.toString()),
    ],
    displayableDatetime
  );
  return converterComponent(resultComponent);
}
