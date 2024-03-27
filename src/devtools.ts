console.info("[GraphQL Network Tab][Devtools Script]: Creating devtools panel.");

chrome.devtools.panels.create("GraphQL Network", "", "/index.html", () => {
  console.info("[GraphQL Network Tab][Devtools Script]: Devtools panel has been created!");
});
