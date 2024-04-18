chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url.includes("https://mail.google.com/chat") &&
    changeInfo.status === "complete"
  ) {
    chrome.tabs.sendMessage(tabId, {
      type: "ADD_TRANSLATE",
    });
  }
});

chrome.tabs.query({}, function (tabs) {

  tabs.forEach((tab) => {
    if (tab.url.includes("https://mail.google.com/chat")) {
      chrome.tabs.reload(tab.id)
      let currentLang = "english";
      chrome.storage.sync.get("TranslateLang", function (res) {
        if (res && res["TranslateLang"]) {
          currentLang = res["TranslateLang"];
        }
        chrome.storage.sync.set({ TranslateLang: currentLang });
      });
    }
  });
});

