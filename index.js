const inputEl = document.getElementById("input");
const infotextEl = document.getElementById("info-text");
const meaningContainerel = document.getElementById("meaning-container");
const meningEl = document.getElementById("meaning");
const titleEl = document.getElementById("title");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infotextEl.style.display = "block";
    meaningContainerel.style.display = "none";
    infotextEl.innerHTML = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
        meaningContainerel.style.display = "block";
        infotextEl.style.display = "none";
      titleEl.innerText = word;
      meningEl.innerText = "N/A";
      audioEl.style.display="none";
    }else{
        infotextEl.style.display = "none";
    meaningContainerel.style.display = "block";
    audioEl.style.display="inline-flex";
    titleEl.innerText = result[0].word;
    meningEl.innerText = result[0].meanings[0].definitions[0].definition;
    audioEl.src = result[0].phonetics[0].audio;
    }
    
  } catch (error) {
    console.log(error);
    
    infotextEl.innerHTML = `An error happened Try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  //    console.log(e.key);
  if (e.target.value && e.key == "Enter") {
    fetchAPI(e.target.value);
  }
});
