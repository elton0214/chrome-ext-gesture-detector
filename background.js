/**
 * Add a listener to listen any upadated on the current tab
 *  1.see if it's a YT page. 
 *  2.get url parameters.
 *  3.send a request to content script with type:"NEW".
 */
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    // Sending a request from the extension to a content script
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});
