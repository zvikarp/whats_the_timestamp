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

function resultComponent() {
  const result = document.createElement("div");
  Object.assign(result.style, { padding: "24px 12px" });

  const header = document.createElement("div");
  header.innerHTML = "The corrent timestamp in millisecounds:";
  Object.assign(header.style, {
    fontSize: "14px",
    color: "#70757A",
    paddingBottom: "6px",
  });

  const timestamp = document.createElement("div");
  const now = Date.now();
  timestamp.innerHTML = now.toString();
  Object.assign(timestamp.style, {
    fontSize: "32px",
    color: "#222",
  });

  result.appendChild(header);
  result.appendChild(timestamp);
  return result;
}

function converterComponent() {
  const converter = document.createElement("div");
  Object.assign(converter.style, {
    width: "652px",
    marginBottom: "24px",
    borderRadius: "8px",
    border: "1px solid #dfe1e5",
  });
  converter.appendChild(resultComponent());
  converter.appendChild(bannerComponent());
  return converter;
}

function injectComponent() {
  const searchRes = document.getElementById("rso");
  searchRes.prepend(converterComponent());
}

function getSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchText = urlParams.get("q");
  return searchText;
}

function run() {
  const searchText = getSearch();
  if (searchText === "timestamp") {
    injectComponent();
  }
}

if (window.document.readyState === "complete") {
  run();
}

window.document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    run();
  }
};
