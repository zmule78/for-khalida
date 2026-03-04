// ===== MEMORY MATCH GAME =====
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
const cardEmojis = ['💛', '💖', '🌹', '✨', '🌟', '💋', '🧡', '💕'];

function startMemoryGame() {
    matchedPairs = 0; moves = 0; flippedCards = [];
    const emojis = [...cardEmojis, ...cardEmojis].sort(() => Math.random() - 0.5);
    const area = document.getElementById('memoryArea');
    area.innerHTML = '<div class="score-display">Moves: 0</div><div class="memory-grid" id="memGrid"></div>';
    const grid = document.getElementById('memGrid');
    emojis.forEach((emoji, i) => {
        const cell = document.createElement('div');
        cell.className = 'memory-cell';
        cell.dataset.emoji = emoji;
        cell.dataset.index = i;
        cell.textContent = emoji;
        cell.onclick = () => flipCard(cell);
        grid.appendChild(cell);
    });
}

function flipCard(cell) {
    if (flippedCards.length >= 2 || cell.classList.contains('flipped') || cell.classList.contains('matched')) return;
    cell.classList.add('flipped');
    flippedCards.push(cell);
    if (flippedCards.length === 2) {
        moves++;
        document.querySelector('.score-display').textContent = 'Moves: ' + moves;
        if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
            flippedCards.forEach(c => c.classList.add('matched'));
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === cardEmojis.length) {
                setTimeout(() => alert('Selamat sayang! Kamu menang dalam ' + moves + ' langkah! \ud83d\udc9b'), 300);
            }
        } else {
            setTimeout(() => { flippedCards.forEach(c => c.classList.remove('flipped')); flippedCards = []; }, 800);
        }
    }
}

// ===== LOVE QUIZ =====
const quizQuestions = [
    { q: 'Tanggal jadian kita?', options: ['1 Nov 2025', '1 Des 2025', '1 Jan 2026', '25 Des 2025'], correct: 1 },
    { q: 'Siapa yang lebih sering ngambek?', options: ['Fikri', 'Khalida', 'Dua-duanya', 'Nggak pernah'], correct: 2 },
    { q: 'Apa yang bikin hubungan kita spesial?', options: ['Jarak', 'Komunikasi', 'Saling percaya', 'Semua benar'], correct: 3 },
    { q: 'Emoji favorit kita?', options: ['💛', '❤️', '💖', '🥰'], correct: 0 },
    { q: 'Apa yang paling penting dalam hubungan?', options: ['Uang', 'Kejujuran', 'Penampilan', 'Status'], correct: 1 }
];
let currentQuestion = 0;
let quizScore = 0;

function startQuiz() {
    currentQuestion = 0; quizScore = 0;
    showQuestion();
}

function showQuestion() {
    const area = document.getElementById('quizArea');
    if (currentQuestion >= quizQuestions.length) {
        area.innerHTML = '<div class="score-display">' + quizScore + '/' + quizQuestions.length + ' Benar!</div><p style="color:#666;">'+
            (quizScore === quizQuestions.length ? 'Sempurna! Kamu memang jodohku 💛' : 'Ayo belajar lagi tentang kita! ✨') + '</p><button class="game-btn" onclick="startQuiz()">Main Lagi</button>';
        return;
    }
    const q = quizQuestions[currentQuestion];
    let html = '<h3 style="color:#B8860B; margin-bottom:16px;">Pertanyaan ' + (currentQuestion+1) + '</h3><p style="color:#666; font-size:1.1em; margin-bottom:16px;">' + q.q + '</p>';
    q.options.forEach((opt, i) => {
        html += '<button class="quiz-option" onclick="answerQuiz(' + i + ', this)">' + opt + '</button>';
    });
    area.innerHTML = html;
}

function answerQuiz(idx, btn) {
    const correct = quizQuestions[currentQuestion].correct;
    const btns = document.querySelectorAll('.quiz-option');
    btns.forEach(b => b.onclick = null);
    if (idx === correct) { btn.classList.add('correct'); quizScore++; }
    else { btn.classList.add('wrong'); btns[correct].classList.add('correct'); }
    currentQuestion++;
    setTimeout(showQuestion, 1000);
}

// ===== LOVE CALCULATOR =====
function calculateLove() {
    const area = document.getElementById('loveCalcArea');
    let pct = 0;
    area.innerHTML = '<div class="love-meter"><div class="love-meter-fill" id="loveFill" style="width:0%"></div></div><div class="score-display" id="lovePct">0%</div>';
    const interval = setInterval(() => {
        pct += 2;
        document.getElementById('loveFill').style.width = pct + '%';
        document.getElementById('lovePct').textContent = pct + '%';
        if (pct >= 100) {
            clearInterval(interval);
            area.innerHTML += '<p style="color:#B8860B;font-size:1.2em;margin-top:10px;">Cinta kita 100%! Sempurna!</p>';
        }
    }, 30);
}

// ===== COMPLIMENT GENERATOR =====
const compliments = [
    'Kamu cantiknya nggak ada tandingannya!',
    'Senyummu bisa bikin hariku 1000x lebih baik',
    'Kamu adalah alasan kenapa aku percaya pada keajaiban',
    'Setiap hari bersamamu terasa seperti hari terbaik',
    'Kamu itu spesial banget, tau nggak?',
    'Dunia jadi lebih indah sejak ada kamu',
    'Matamu itu kayak bintang, selalu bersinar',
    'Nggak ada kata yang cukup untuk gambarkan betapa beruntungnya aku',
    'Kamu adalah jawaban dari setiap doaku',
    'Tawa kamu itu musik paling indah yang pernah aku dengar',
    'Kamu bikin aku jadi orang yang lebih baik setiap harinya',
];

function generateCompliment() {
    const area = document.getElementById('complimentArea');
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    area.innerHTML = '<div style="padding:20px;background:linear-gradient(135deg,#FFD700,#FFA500);border-radius:16px;color:#fff;font-size:1.3em;margin-top:15px;">' + random + '</div><button class="game-btn" onclick="generateCompliment()" style="margin-top:15px;">Lagi dong!</button>';
}