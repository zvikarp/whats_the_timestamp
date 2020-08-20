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
