const searchTextComponents = {
  timestamp_now: renderTimestampComponent,
  dateTime_now: renderDatetimeComponent,
};

function injectComponent(component) {
  const searchRes = document.getElementById("rso");
  searchRes.prepend(component);
}

function getSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedSearchText = urlParams.get("q") || "";
  const searchCode = searchTextToCode(encodedSearchText);
  return searchCode;
}

function run() {
  const searchCode = getSearch();
  if (searchCode) injectComponent(searchTextComponents[searchCode]());
}

if (window.document.readyState === "complete") {
  run();
}

window.document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    run();
  }
};
