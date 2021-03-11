const synth = window.speechSynthesis;
const input = document.querySelector('[name="text"]');
const speech = new SpeechSynthesisUtterance(input.value);
const voiceSelect = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="rate"]');
const speakButton = document.querySelector('#speak-btn');
const stopButton = document.querySelector('#stop-btn');
const robot = document.querySelector('.robot');
const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
let voice = [];

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

voiceSelect.addEventListener('change', (e) => {
  speech.voice = voices.find((voice) => voice.name == e.target.value);
});

speakButton.addEventListener('click', startTalk);
stopButton.addEventListener('click', stopTalk);

function startTalk() {
  rate.addEventListener('change', () => {
    stopTalk();
    startTalk();
  });
  pitch.addEventListener('change', () => {
    stopTalk();
    startTalk();
  });
  let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      speech.voice = voices[i];
    }
  }
  robot.classList.add('robot_listeningAnim', 'robot_lowAnim');
  speech.pitch = pitch.value;
  speech.rate = rate.value;
  synth.speak(speech);
}

function stopTalk() {
  robot.classList.remove('robot_listeningAnim', 'robot_lowAnim');
  synth.cancel();
}

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    let option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}
