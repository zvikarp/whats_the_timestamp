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
  const { func, text, args } = getSearch() || {};
  if (func) {
    injectComponent(func(text, args));
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
