// Object to store decks and their flashcards
const flashcardApp = {
    decks: {}, // Key: deck name, Value: array of flashcards
};

// Function to add a new deck
function addDeck(deckName) {
    if (flashcardApp.decks[deckName]) {
        alert(`Deck "${deckName}" already exists.`);
        return;
    }
    flashcardApp.decks[deckName] = [];
    updateDeckList();
}

// Function to add a flashcard to a deck
function addFlashcard(deckName, question, answer) {
    if (!flashcardApp.decks[deckName]) {
        alert(`Deck "${deckName}" does not exist.`);
        return;
    }
    flashcardApp.decks[deckName].push({ question, answer });
    updateFlashcardList(deckName);
}

// Update the list of decks displayed
function updateDeckList() {
    const deckList = document.getElementById('deckList');
    deckList.innerHTML = ''; // Clear existing list

    Object.keys(flashcardApp.decks).forEach((deckName) => {
        const li = document.createElement('li');
        li.textContent = deckName;
        li.style.cursor = 'pointer';
        li.onclick = () => selectDeck(deckName); // Click to view flashcards
        deckList.appendChild(li);
    });
}

// Update the list of flashcards displayed
function updateFlashcardList(deckName) {
    const flashcardList = document.getElementById('flashcardList');
    flashcardList.innerHTML = ''; // Clear existing list

    flashcardApp.decks[deckName].forEach((flashcard, index) => {
        const li = document.createElement('li');
        li.textContent = `Q: ${flashcard.question} | A: ${flashcard.answer}`;
        flashcardList.appendChild(li);
    });
}

// Select a deck to add flashcards or view its flashcards
function selectDeck(deckName) {
    document.getElementById('currentDeckTitle').textContent = `Add Flashcards to Deck: "${deckName}"`;
    document.getElementById('addFlashcardForm').style.display = 'block';
    document.getElementById('flashcardList').innerHTML = ''; // Clear previous flashcards
    updateFlashcardList(deckName);
}

// Event listener for adding a new deck
document.getElementById('addDeckForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const deckName = document.getElementById('deckName').value.trim();
    if (deckName) {
        addDeck(deckName);
        document.getElementById('deckName').value = ''; // Clear input field
    } else {
        alert('Please enter a valid deck name.');
    }
});

// Event listener for adding a new flashcard
document.getElementById('addFlashcardForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const deckName = document.getElementById('currentDeckTitle').textContent.replace('Add Flashcards to Deck: "', '').replace('"', '');
    const question = document.getElementById('flashcardQuestion').value.trim();
    const answer = document.getElementById('flashcardAnswer').value.trim();

    if (question && answer) {
        addFlashcard(deckName, question, answer);
        document.getElementById('flashcardQuestion').value = ''; // Clear input fields
        document.getElementById('flashcardAnswer').value = '';
    } else {
        alert('Please enter both a question and an answer.');
    }
});
