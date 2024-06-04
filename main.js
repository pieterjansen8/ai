function ai(text) {
  const data = JSON.stringify({
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
    system_prompt: "Speak in Dutch",
    temperature: 0.9,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 256,
    web_access: false,
  });
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.response)

      responsiveVoice.speak(this.response, "UK English Male")
    }
  });

  xhr.open("POST", "https://chatgpt-42.p.rapidapi.com/geminipro");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "f6010afc29msh95eb7604f02147bp1b79ddjsn0c4876fb1595"
  );
  xhr.setRequestHeader("x-rapidapi-host", "chatgpt-42.p.rapidapi.com");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);



}

speak = () => {
  document.getElementById("output").innerHTML = "Loading text...";
  var output = document.getElementById("output");
  var action = document.getElementById("action");
  let recognization = new webkitSpeechRecognition();
  recognization.onstart = () => {
    action.innerHTML = "Listening...";
  };
  recognization.onresult = (e) => {
    var transcript = e.results[0][0].transcript;
    ai(transcript)
  };
  recognization.start();
};

