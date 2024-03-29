function GeminiTranslateFunc(translateText) {
  var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=<GEMINI-API-KEY>";

  var payloadData = {
                    "contents": [
                      {
                        "parts": [
                          {
                            "text": translateText
                          }
                        ]
                      }
                    ],
                    "safetySettings": [
                      {
                          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                          "threshold": "BLOCK_ONLY_HIGH"
                      },
                      {
                          "category": "HARM_CATEGORY_HATE_SPEECH",
                          "threshold": "BLOCK_ONLY_HIGH"
                      },
                      {
                          "category": "HARM_CATEGORY_HARASSMENT",
                          "threshold": "BLOCK_ONLY_HIGH"
                      },
                      {
                          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                          "threshold": "BLOCK_ONLY_HIGH"
                      }
                  ],
                    "generationConfig": {
                        "temperature": 1
                }
                  }
  var options = {
      "method": "post",
      "payload": JSON.stringify(payloadData),
      'contentType': 'application/json',
  };
  var response = UrlFetchApp.fetch(url, options);
  var respObj = JSON.parse(response.getContentText())
  return respObj?.candidates[0]?.content?.parts[0]?.text || ""
}

function TestGeminiTranslateFunc(){
      const jsonData = GeminiTranslateFunc("Translate the meaning of the text to hindi \r\n Text: 'How are you?'");
      console.log(jsonData)

}

const doPost = (request = {}) => {

  const { postData: { contents, type } = {} } = request;
  var reqBody = JSON.parse(contents)
  var fromIndx = -1
  var toIndx = -1
  var translateFromTxt = ""
  var translateToTxt = "English"

  if(reqBody.translateFrom != "") {
    fromIndx = SupportedLanguages.findIndex((item) => { return item.indexOf(reqBody.translateFrom.toLowerCase()) !== -1 } )
  }

  if(reqBody.translateTo != ""){
    toIndx = SupportedLanguages.findIndex((item) => { return item.indexOf(reqBody.translateTo.toLowerCase()) !== -1 } )
  }

  if(fromIndx > -1) {
    translateFromTxt = SupportedLanguages[fromIndx]
  }
 if(toIndx > -1) {
    translateToTxt = SupportedLanguages[toIndx]
  }

  const jsonData = GeminiTranslateFunc("Translate the meaning of the "+translateFromTxt+" text  to "+translateToTxt+" \r\n Text: '"+reqBody.translateText+"'");
  return ContentService.createTextOutput(JSON.stringify(jsonData != "" ? jsonData : reqBody.translateText));

};


const SupportedLanguages = [
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
    "english",
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
    "hindi",
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
    "kannada",
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
    "tamil",
    "tatar",
    "telugu",
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
]



