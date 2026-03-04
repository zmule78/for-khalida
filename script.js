// Music Control
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            music.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// Countdown Timer
function updateCountdown() {
    const startDate = new Date('2025-12-01T00:00:00');
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

if (document.getElementById('days')) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Love Quotes RSS Feed
const loveQuotes = [
    "Every love story is beautiful, but ours is my favorite. 💛",
    "You are my today and all of my tomorrows.",
    "In you, I've found the love of my life and my closest, truest friend.",
    "Together is my favorite place to be.",
    "You are my sunshine on a rainy day.",
    "My heart is and always will be yours.",
    "You make every day worth remembering.",
    "With you, forever isn't long enough.",
    "You're the reason I believe in love.",
    "Every moment with you is a blessing.",
    "You are my greatest adventure.",
    "Loving you is the best decision I've ever made.",
    "You are my happy place.",
    "My love for you grows stronger every day.",
    "You are the missing piece I've been searching for.",
    "Thank you for being my everything.",
    "You make my heart smile.",
    "Forever isn't long enough with you.",
    "You are my dream come true.",
    "I fall in love with you more and more each day.",
    "You are my forever and always.",
    "With you, I am home.",
    "You are my greatest blessing.",
    "I love you more than words can express.",
    "You complete me in every way.",
    "My heart belongs to you, now and forever.",
    "You are the love I never knew I needed.",
    "Every day with you is a gift.",
    "You are my happy ending.",
    "I choose you, every single day."
];

function getDailyQuote() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % loveQuotes.length;
    return loveQuotes[quoteIndex];
}

const quoteElement = document.getElementById('quote-text');
if (quoteElement) {
    quoteElement.textContent = getDailyQuote();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.innerHTML = '✨';
    
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnim 1s forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(1.5) rotate(180deg);
        }
    }
`;
document.head.appendChild(style);