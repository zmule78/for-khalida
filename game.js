// Love Calculator
function calculateLove() {
    const lovePercentage = 100; // Always 100% for us!
    const resultDiv = document.getElementById('love-result');
    resultDiv.innerHTML = `
        <div class="love-meter">
            <h3>Our Love is ${lovePercentage}%!</h3>
            <div class="meter-bar">
                <div class="meter-fill" style="width: ${lovePercentage}%"></div>
            </div>
            <p class="love-message">✨ Perfect Match! Our love is infinite and unbreakable! 💛</p>
        </div>
    `;
}

// Memory Match Game
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

const cardEmojis = ['💛', '💕', '💖', '💗', '💓', '💞', '💝', '❤️'];

function startMemoryGame() {
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0/8';
    
    memoryCards = [...cardEmojis, ...cardEmojis].sort(() => Math.random() - 0.5);
    
    const gameBoard = document.getElementById('memory-game');
    gameBoard.innerHTML = '';
    
    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerHTML = '<div class="card-back">?</div>';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length >= 2 || this.classList.contains('flipped')) return;
    
    this.classList.add('flipped');
    this.innerHTML = this.dataset.emoji;
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').textContent = `${matchedPairs}/8`;
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                alert(`🎉 You won! You found all pairs in ${moves} moves! 🎉`);
            }, 300);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '<div class="card-back">?</div>';
        card2.innerHTML = '<div class="card-back">?</div>';
    }
    
    flippedCards = [];
}

// Fortune Cookie
const fortunes = [
    "Your love story will inspire others. Keep cherishing each moment together. 💛",
    "A beautiful surprise awaits you both in the near future. ✨",
    "Your bond grows stronger with each passing day. Keep supporting each other. 💕",
    "Together, you can overcome any challenge. Your love is your strength. 💪",
    "The best memories are yet to be made. Keep creating magic together. ✨",
    "Your partner thinks of you more than you know. You're always in their heart. 💝",
    "A romantic moment is coming your way soon. Be ready! 💖",
    "Your love will stand the test of time. Forever and always. ♾️",
    "Trust, respect, and love - you have it all. Treasure it. 💓",
    "Your relationship is a blessing. Never take it for granted. 🙏"
];

function getFortune() {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    const resultDiv = document.getElementById('fortune-result');
    resultDiv.innerHTML = `
        <div class="fortune-cookie">
            <p class="fortune-text">${fortune}</p>
        </div>
    `;
}

// Would You Rather
const wyrQuestions = [
    {
        question: "Would you rather...",
        options: ["Have a coffee date every day", "Have a movie night every week"]
    },
    {
        question: "Would you rather...",
        options: ["Travel the world together", "Build a cozy home together"]
    },
    {
        question: "Would you rather...",
        options: ["Cook dinner together", "Order takeout and cuddle"]
    },
    {
        question: "Would you rather...",
        options: ["Wake up early for sunrise", "Stay up late for stargazing"]
    },
    {
        question: "Would you rather...",
        options: ["Dance in the rain", "Build a blanket fort"]
    }
];

function getWouldYouRather() {
    const wyr = wyrQuestions[Math.floor(Math.random() * wyrQuestions.length)];
    document.getElementById('wyr-question').textContent = wyr.question;
    
    const optionsDiv = document.getElementById('wyr-options');
    optionsDiv.innerHTML = `
        <button class="wyr-option">${wyr.options[0]}</button>
        <span class="wyr-or">OR</span>
        <button class="wyr-option">${wyr.options[1]}</button>
    `;
}

// Quiz Game
const quizQuestions = [
    {
        question: "What did Faiz win at the conference?",
        options: ["Silver Medal", "Gold Medal", "Bronze Medal"],
        correct: 1
    },
    {
        question: "What major is Faiz studying?",
        options: ["Japanese Literature", "English Literature", "International Relations"],
        correct: 0
    },
    {
        question: "Which music does Faiz like?",
        options: ["Denny Caknan", "Banda Neira", "Last Child"],
        correct: 1
    },
    {
        question: "When did we officially start dating?",
        options: ["November 1, 2025", "December 1, 2025", "January 1, 2026"],
        correct: 1
    },
    {
        question: "Where did our love story officially begin?",
        options: ["East Indies", "Cat Cafe", "Ekara 2"],
        correct: 1
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;

function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }
    
    const question = quizQuestions[currentQuizQuestion];
    const container = document.getElementById('quiz-container');
    
    let optionsHTML = '';
    question.options.forEach((option, index) => {
        optionsHTML += `<button class="quiz-option" onclick="checkQuizAnswer(${index})">${option}</button>`;
    });
    
    container.innerHTML = `
        <div class="quiz-question">
            <h4>Question ${currentQuizQuestion + 1}/${quizQuestions.length}</h4>
            <p>${question.question}</p>
            <div class="quiz-options">${optionsHTML}</div>
        </div>
    `;
}

function checkQuizAnswer(selected) {
    const question = quizQuestions[currentQuizQuestion];
    if (selected === question.correct) {
        quizScore++;
        alert('✅ Correct! You know me well!');
    } else {
        alert('❌ Oops! The correct answer was: ' + question.options[question.correct]);
    }
    currentQuizQuestion++;
    showQuizQuestion();
}

function showQuizResult() {
    const container = document.getElementById('quiz-container');
    const percentage = (quizScore / quizQuestions.length) * 100;
    
    let message = '';
    if (percentage === 100) {
        message = 'Perfect! You know me inside out! 💕';
    } else if (percentage >= 60) {
        message = 'Great job! You know me well! 💛';
    } else {
        message = 'We should spend more time together! 😊';
    }
    
    container.innerHTML = `
        <div class="quiz-result">
            <h3>Quiz Complete!</h3>
            <p class="quiz-score">Score: ${quizScore}/${quizQuestions.length}</p>
            <p class="quiz-message">${message}</p>
            <button class="game-btn" onclick="startQuiz()">Try Again</button>
        </div>
    `;
}

// Virtual Hugs
let hugCount = 0;

function sendHug() {
    hugCount++;
    document.getElementById('hug-count').textContent = hugCount;
    
    // Create floating hug animation
    const hug = document.createElement('div');
    hug.textContent = '🤗';
    hug.style.position = 'fixed';
    hug.style.left = Math.random() * window.innerWidth + 'px';
    hug.style.top = '100vh';
    hug.style.fontSize = '3rem';
    hug.style.transition = 'all 2s ease-out';
    hug.style.pointerEvents = 'none';
    hug.style.zIndex = '10000';
    document.body.appendChild(hug);
    
    setTimeout(() => {
        hug.style.top = '-100px';
        hug.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        hug.remove();
    }, 2000);
}

// Initialize memory game on page load
if (document.getElementById('memory-game')) {
    startMemoryGame();
}