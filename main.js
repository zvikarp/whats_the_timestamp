const searchTextComponents = {
  timestamp_now: renderTimestampComponent,
  dateTime_now: renderDatetimeComponent,
  convert_timestamp: renderDatetimeComponent,
};

function injectComponent(component) {
  const searchRes =
    document.getElementById("rso") || document.getElementById("res");
  if (searchRes) searchRes.prepend(component);
}

function getSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedSearchText = urlParams.get("q") || "";
  return searchTextToCode(encodedSearchText);
}

function run() {
  const { parserFunc, parserResult } = getSearch() || {};
  if (parserFunc) {
    injectComponent(searchTextComponents[parserFunc](parserResult));
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
