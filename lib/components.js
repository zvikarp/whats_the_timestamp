function bannerComponent() {
  const banner = document.createElement("div");
  banner.innerHTML = "Created by Zvi Karp";
  Object.assign(banner.style, {
    borderTop: "1px solid #dfe1e5",
    fontSize: "12px",
    color: "#70757A",
    padding: "12px",
  });
  return banner;
}

function baseResultComponent(childrenComponents) {
  const result = document.createElement("div");
  Object.assign(result.style, { padding: "24px 12px" });
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

  const resultComponent = baseResultComponent([
    pComponent("The corrent timestamp in millisecounds:"),
    h1Component(now.toString()),
  ]);
  return converterComponent(resultComponent);
}

function renderDatetimeComponent(timestamp) {
  const dateTime = isValidTimestamp(timestamp)
    ? new Date(parseInt(timestamp))
    : new Date();

  const resultComponent = baseResultComponent([
    pComponent(
      isValidTimestamp(timestamp)
        ? `the timestamp ${dateTime} in dateTime is:`
        : "The corrent dateTime is:"
    ),
    h1Component(dateTime.toString()),
  ]);
  return converterComponent(resultComponent);
}
