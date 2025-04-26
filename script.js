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

// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  
  recognition.onstart = () => {
    micBtn.classList.add('listening');
  };
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    handleSearch();
    micBtn.classList.remove('listening');
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error', event);
    micBtn.classList.remove('listening');
    alert("Speech recognition failed. Please try again or type your query.");
  };
  
  recognition.onend = () => {
    micBtn.classList.remove('listening');
  };
}
// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Auto-focus the input on load
  searchInput.focus();
  
  // Update history display
  updateHistoryDisplay();
});

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

micBtn.addEventListener('click', startListening);

historyBtn.addEventListener('click', toggleHistoryDropdown);

clearHistoryBtn.addEventListener('click', clearHistory);

// Click outside to close history dropdown
document.addEventListener('click', (e) => {
  if (!historyDropdown.contains(e.target) && 
      e.target !== historyBtn && 
      !historyBtn.contains(e.target) && 
      historyDropdown.style.display === 'block') {
    historyDropdown.style.display = 'none';
  }
});
// Functions
function handleSearch() {
  const word = searchInput.value.trim();
  if (!word) return;
  
  fetchWordData(word);
  historyDropdown.style.display = 'none';
}


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
  wordData.meanings.forEach((meaning) => {
    const meaningSection = document.createElement{'div'};
    meaningSection.className = 'meaning-section';

    // part of speech header
    const meaningHeader = document.createElement('div');
    meaningHeader.className = 'meaning-header';
    meaningHeader.innerHTML = `
      <span class="part-of-speech">${meaning.partOfSpeech}</span>
    `;
    meaningSection.appendChild(meaningHeader);

     // Definations
     const definitionsDiv = document.createElement('div');
     definitionsDiv.className = 'definitions';
    
    meaning.definitions.forEach((def, index) => {
      const definition = document.createElement('div');
      definition.className = 'definition';
      
      let definitionHtml = `
        <p>
          <span class="definition-number">${index + 1}.</span> 
          ${def.definition}
        </p>
      `;
      
      if (def.example) {
        definitionHtml += `
          <p class="definition-example">"${def.example}"</p>
        `;
      }
      
      definition.innerHTML = definitionHtml;
      definitionsDiv.appendChild(definition);
    });
    
    meaningSection.appendChild(definitionsDiv);

    // synonyms
    if (meaning.synonyms && meaning.synonyms.length > 0) {
      const synonymsDiv = document.createElement('div');
      synonymsDiv.className = 'synonyms';
      
      let synonymsHtml = `
        <h4>Synonyms:</h4>
        <div class="synonyms-list">
      `;
      
      meaning.synonyms.forEach(synonym => {
        synonymsHtml += `
          <button 
            class="synonym-tag" 
            onclick="fetchWordData('${synonym}')"
          >${synonym}</button>
        `;
      });
      
      synonymsHtml += </div>;
      synonymsDiv.innerHTML = synonymsHtml;
      meaningSection.appendChild(synonymsDiv);
    }
    meaningsContainer.appendChild(meaningSection);
  })

  //Source URL
  if (wordData.sourceUrls && wordData.sourceUrls.length > 0) {
    const url = wordData.sourceUrls[0];
    sourceUrl.href = url;
    sourceText.textContent = url.replace(/^https?:\/\//, '').split('/')[0];
    sourceSection.style.display = 'block';
  } else {
    sourceSection.style.display = 'none';
  }
}
function playAudio(audioUrl) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  const audio = new Audio(audioUrl);
  currentAudio = audio;
  audio.play()
    .catch(err => {
      console.error('Error playing audio:', err);
      alert("Could not play pronunciation audio.");
    });
}
function showLoading(isLoading) {
  loadingState.style.display = isLoading ? 'flex' : 'none';
}

function showNotFound(word) {
  notFoundState.style.display = 'block';
  notFoundWord.textContent = `We couldn't find any definitions for "${word}"`;
}
function resetUI() {
  loadingState.style.display = 'none';
  notFoundState.style.display = 'none';
  wordContent.style.display = 'none';
}













    



