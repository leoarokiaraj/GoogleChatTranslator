const inputField = document.querySelector('.chosen-value');
const dropdown = document.querySelector('.value-list');
const langList = [
    "english",
    "hindi",
    // "telugu",
    // "tamil",
    "afrikaans",
    "albanian",
    "amharic",
    "arabic",
    "armenian",
    "assamese",
    "aymara",
    "azerbaijani",
    "bambara",
    "basque",
    "belarusian",
    "bengali",
    "bhojpuri",
    "bosnian",
    "bulgarian",
    "catalan",
    "cebuano",
    "chinese (simplified)",
    "chinese (traditional)",
    "corsican",
    "croatian",
    "czech",
    "danish",
    "dhivehi",
    "dogri",
    "dutch",
    "esperanto",
    "estonian",
    "ewe",
    "filipino (tagalog)",
    "finnish",
    "french",
    "frisian",
    "galician",
    "georgian",
    "german",
    "greek",
    "guarani",
    "gujarati",
    "haitian creole",
    "hausa",
    "hawaiian",
    "hebrew",
    "hmong",
    "hungarian",
    "icelandic",
    "igbo",
    "ilocano",
    "indonesian",
    "irish",
    "italian",
    "japanese",
    "javanese",
    //"kannada",
    "kazakh",
    "khmer",
    "kinyarwanda",
    "konkani",
    "korean",
    "krio",
    "kurdish",
    "kurdish (sorani)",
    "kyrgyz",
    "lao",
    "latin",
    "latvian",
    "lingala",
    "lithuanian",
    "luganda",
    "luxembourgish",
    "macedonian",
    "maithili",
    "malagasy",
    "malay",
    "malayalam",
    "maltese",
    "maori",
    "marathi",
    "meiteilon (manipuri)",
    "mizo",
    "mongolian",
    "myanmar (burmese)",
    "nepali",
    "norwegian",
    "nyanja (chichewa)",
    "odia (oriya)",
    "oromo",
    "pashto",
    "persian",
    "polish",
    "portuguese (portugal, brazil)",
    "punjabi",
    "quechua",
    "romanian",
    "russian",
    "samoan",
    "sanskrit",
    "scots gaelic",
    "sepedi",
    "serbian",
    "sesotho",
    "shona",
    "sindhi",
    "sinhala (sinhalese)",
    "slovak",
    "slovenian",
    "somali",
    "spanish",
    "sundanese",
    "swahili",
    "swedish",
    "tagalog (filipino)",
    "tajik",
    "tatar",
    "thai",
    "tigrinya",
    "tsonga",
    "turkish",
    "turkmen",
    "twi (akan)",
    "ukrainian",
    "urdu",
    "uyghur",
    "uzbek",
    "vietnamese",
    "welsh",
    "xhosa",
    "yiddish",
    "yoruba",
    "zulu"
];

langList.forEach(item => {
    let liNode = document.createElement('li');
    liNode.innerHTML = item;
    document.getElementById('langList').appendChild(liNode)
})


const dropdownArray = [...document.querySelectorAll('li')]

let valueArray = [];

chrome.storage.sync.get("TranslateLang",function(res) {
  if(res && res["TranslateLang"]) {
    inputField.value = res["TranslateLang"]
  }
});

const selectLangEvent = (item) => {
    inputField.value = item.currentTarget.textContent;
    chrome.storage.sync.set({ "TranslateLang": inputField.value });
    dropdown.classList.remove('open');
}

inputField.addEventListener('input', () => {
  dropdown.classList.add('open');
  let inputValue = inputField.value.toLowerCase();
  let valueSubstring;
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArray.length; j++) {
      if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
        dropdownArray[j].classList.add('closed');
      } else {
        dropdownArray[j].classList.remove('closed');
      }
    }
  } else {
    for (let i = 0; i < dropdownArray.length; i++) {
      dropdownArray[i].classList.remove('closed');
    }
  }
});

dropdownArray.forEach(item => {
  item.addEventListener('click', selectLangEvent.bind(item));
})

inputField.addEventListener('focus', () => {
   inputField.placeholder = 'Type to filter';
   dropdown.classList.add('open');
   dropdownArray.forEach(dropdown => {
     dropdown.classList.remove('closed');
   });
});

document.addEventListener('click', (evt) => {
  const isDropdown = dropdown.contains(evt.target);
  const isInput = inputField.contains(evt.target);
  if (!isDropdown && !isInput) {
    dropdown.classList.remove('open');
  }
});

dropdownArray.forEach(item => {
  valueArray.push(item.textContent);
});