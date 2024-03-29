const TRANSLATE_URL =
  "https://script.google.com/macros/s/AKfycby7lMvjSMMinG_tAj2dacbbFbr4FK2kkJ8MrycvR_R6pneY7p6qe1KGoqy_dtUjTd3p/exec";
const SENDERID = "CHAT_CONTENT";

const PostMessageToChatContentFunc = (messageIFrame) => {
  try {
    if (messageIFrame && messageIFrame.contentWindow) {
      messageIFrame.contentWindow.postMessage(
        {
          sender: SENDERID,
        },
        "*"
      );
    }
  } catch (error) {
    console.log(error)
  }

};

const FetchTranslationText = async (translateLang, translateText) => {
  let resp = await fetch(TRANSLATE_URL, {
    method: "POST",
    body: JSON.stringify({
      translateFrom: "",
      translateTo: translateLang,
      translateText: translateText,
    }),
    headers: {
      "Content-Type": "text/plain;",
    },
    redirect: "follow",
  });
  return await resp.json();
};

const SeeTranslationFunc = async (messageNode, spanNode, updateMsg) => {
  spanNode.onclick = ()=>{ return; }
  console.log('trnaslate click')

  if (messageNode.childNodes[4]?.innerHTML === "See Translation") {
    spanNode.classList.add("seeTranslationLoading");

    let translateLang = "english";
    translateLang = (await chrome.storage.sync.get("TranslateLang"))[
      "TranslateLang"
    ];

    updateMsg.innerHTML = await FetchTranslationText(
      translateLang,
      updateMsg.innerHTML
    );
    spanNode.classList.remove("seeTranslationLoading");
    spanNode.textContent = "Undo Translation";
  } else {
    spanNode.textContent = "See Translation";
    updateMsg.innerHTML = spanNode.getAttribute("original-text");
  }
  spanNode.onclick =  async () => {
    await SeeTranslationFunc(messageNode, spanNode, updateMsg);
  };
};

chrome.runtime.onMessage.addListener((obj, sender, response) => {
  const messageIFrame = document.querySelectorAll(
    'iframe[title="Chat content"]'
  )[0];
  PostMessageToChatContentFunc(messageIFrame);
  setInterval(PostMessageToChatContentFunc, 5000, messageIFrame);
});

window.addEventListener("message", (event) => {
  if (event.data.sender == SENDERID) {
    const messageDocument = event.currentTarget.document;

  
    const dataElement = messageDocument.getElementsByTagName("c-wiz")[0]

    if (!(dataElement && dataElement.hasAttribute("data-p"))){
      return;
    }

    const creatorID = dataElement
      .getAttribute("data-p")
      .split("human/")[1]
      .split(",")[0]
      .replace('"', "");

    const allReceivedMsg = document.querySelectorAll(
      'c-wiz[data-creator-id]:not([data-creator-id="' + creatorID + '"])'
    );

    for (let index = 0; index < allReceivedMsg.length; index++) {
      const msgElement = allReceivedMsg[index];

      const messageNode = msgElement.querySelector(
        "div:nth-child(3) > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div"
      );

      if (messageNode && messageNode.childNodes.length > 1 && (
        !messageNode.childNodes[4] ||
        (messageNode.childNodes[4]?.innerHTML !== "See Translation" &&
          messageNode.childNodes[4]?.innerHTML !== "Undo Translation"))
      ) {
        const updateMsg = messageNode.childNodes[0]
          .querySelector("div")
          .querySelector("div");
        if (updateMsg) {
          const spanNode = document.createElement("span");
          spanNode.textContent = "See Translation";
          spanNode.setAttribute("class", "seeTranslation");
          spanNode.setAttribute("original-text", updateMsg.innerHTML);
          spanNode.onclick = async () => {
            await SeeTranslationFunc(messageNode, spanNode, updateMsg);
          };
          messageNode.appendChild(spanNode);
        }
        
      }
    }
  }
});
