
#  Dictionary App

## **📘 Overview**

**WordWave** is a modern Dictionary Web Application that allows users to look up word definitions, phonetics, synonyms, and usage examples in real-time. It utilizes the Free Dictionary API to deliver accurate and up-to-date word data. Built with HTML, CSS, and JavaScript, the application features voice search, search history, and responsive design for a smooth and interactive experience across devices.

## **✨ Key Features**

- **Word Search:** Instantly search for word meanings, phonetic transcription, and usage examples.
- **Voice Search:** Use your microphone to speak and search for words hands-free.
- **Phonetics Audio:** Listen to correct word pronunciation when phonetic audio is available.
- **Recent History:** View and revisit your recent word searches with a dropdown.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
- **Error Handling:** Displays a friendly message when the searched word is not found.
---

### 🎨 *User Interface*

- *Header:*  
  Displays the application title *"WordWave"* along with a short tagline "Explore words with style and sound" to introduce the purpose of the app.

- *Search Box:*  
  A prominently centered input field where users can *type a word* they want to look up.

- *Search Actions:*  
  - 🔍 *Search Button* to fetch word details  
  - 🎤 *Microphone Button* to perform *voice-based search*  
  - 🔁 *History Button* to access recently searched words

- *Result Area:*  
  Initially hidden, this section becomes visible after a word is searched. It displays:
  - The *word title*
  - *Phonetic transcription*
  - *Audio button* to hear pronunciation
  - *Definitions, **examples, and **synonyms*
  - A user-friendly *"Word not found"* message if the lookup fails

  ---
  ### 📂 *Project Files*

- *index.html*  
  Contains the complete *HTML structure* of the application, including the header, search input, buttons, and result display layout.

- *style.css*  
  Provides the *styling* for the application, including layout, colors, animations, responsive design, and component appearance.

- *script.js*  
  Handles all the *functionality* of the app, such as:
  - Fetching word data from the Dictionary API
  - Managing voice search with Speech Recognition
  - Updating the UI dynamically based on user interactions
  - Managing search history and playback of word pronunciation
    
## 🛠 Tech Stack

- *HTML* – Structure of the app  
- *CSS* – Styling and layout  
- *JavaScript* – Logic and interactivity  
- *[Free Dictionary API]* – For fetching word data

---
## 📦 How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dictionary-app.git
   
👥 Team Members
1.Saihajpreet Kaur
2.Ranjot Kaur
3.Ronit Khanna
4.Om Aggarwal


💡 Future Improvements
📚 Show example usage of the word in a sentence

⭐ Allow saving favorite words (localStorage)

🕓 Add search history for quick access

🌙 Dark mode toggle

📱 Improve responsive design for mobile devices
