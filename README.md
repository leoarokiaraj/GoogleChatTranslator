<br />
<div align="center">
  <img src="assets/GoogleChatTranslatorLogo.png" alt="Logo" width="80" height="80">
  <h2 align="center">Google Chat Translator</h2>
</div>

<h1> 
  Download it from here:  <a href="https://github.com/leoarokiaraj/GoogleChatTranslator/raw/main/GoogleChatTranslator.zip" download> ⬇️ GoogleChatTranslator.zip</a>
</h1>


## About The Project:

This is a small Google Chrome extension for translating your Google Chat messages into your desired language.

### Built With

<div> 
  <img  alt="HTML5" width="39px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" /> 
  <img  alt="CSS3" width="39px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />
  <img  alt="JavaScript" width="31px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
</div>

### Usage

1. Choose the language in Extension window

     <img width="250" alt="image" src="https://github.com/leoarokiaraj/GoogleChatTranslator/assets/40320758/2f01ef3a-6337-43a0-9c91-85ec6f45f0c4">


2. Click `See translation` button below each message for translation.

    <img width="400" alt="image" src="https://github.com/leoarokiaraj/GoogleChatTranslator/assets/40320758/99b3b1e1-5f6f-4947-9e55-865f4e699472"> 
    <img width="400" alt="image" src="https://github.com/leoarokiaraj/GoogleChatTranslator/assets/40320758/b800f408-7728-40be-99f5-2c0f6f8545fd">


### Setup
1. Clone the repo
   
   ```sh 
   git clone https://github.com/leoarokiaraj/GoogleChatTranslator.git
   ```
   
2. Get your api Key at - https://aistudio.google.com/app/apikey
   
3. Update your api key in `google-appscript/code.gs`
   
    ```sh
       var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=<GEMINI-API-KEY>";
    ```


### Installation

1. Deploy the `google-appscript/code.gs` in Google App Script as a Web App.

2. Zip the code content and install it as a Chrome Extension


   
   
