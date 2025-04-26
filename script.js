// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const micBtn = document.getElementById('mic-btn');
const historyBtn = document.getElementById('history-btn');
const historyDropdown = document.getElementById('history-dropdown');
const historyList = document.getElementById('history-list');
const emptyHistory = document.getElementById('empty-history');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const loadingState = document.getElementById('loading');
const notFoundState = document.getElementById('not-found');
const notFoundWord = document.getElementById('not-found-word');
const wordContent = document.getElementById('word-content');
const wordTitle = document.getElementById('word-title');
const wordPhonetic = document.getElementById('word-phonetic');
const playAudioBtn = document.getElementById('play-audio');
const meaningsContainer = document.getElementById('meanings-container');
const sourceSection = document.getElementById('source-section');
const sourceUrl = document.getElementById('source-url');
const sourceText = document.getElementById('source-text');
// Global variables
let currentAudio = null;
let searchHistory = JSON.parse(localStorage.getItem('wordwave_history')) || [];




---
async function fetchWordData(word) {
  resetUI();
  showLoading(true);

  try {
    const response = await fetch(https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()});

    if (!response.ok) {
      showNotFound(word);
      return;
    }

    const data = await response.json();
    displayWordData(data[0]);
    addToHistory(word);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert("Failed to fetch word data. Please try again.");
  } finally {
    showLoading(true);
  }
}
function displayWordData(wordData){
  wordContent.style.display = 'block';
  wordTitle.textContent = wordData.word;
  wordPhonetic.textContent = wordData.phonetic || '';

  // Set up audio button
  const audioUrl = wordData.phonetics?.find(p => p.audio)?.audio || '';
  if (audioUrl) {
    playAudioBtn.style.display = 'flex';
    playAudioBtn.onclick = () => {
      playAudio(audioUrl);
    };
  } else {
    playAudioBtn.style.display = 'none';
  }
  // Render meanings
  meaningsContainer.innerHTML = '';



}









    



