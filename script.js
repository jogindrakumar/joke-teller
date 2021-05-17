const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable / Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing joke to voice API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "Type your private API key here ",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}  ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-speech
    tellMe(joke);
    //Disable Button
    toggleButton();
  } catch (error) {
    //catch error
    console.log("whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
