// ===== HAMBURGER MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
// Close menu when link clicked
document.querySelectorAll('.nav-menu a').forEach(a => {
    a.addEventListener('click', () => navMenu.classList.remove('active'));
});

// ===== MUSIC CONTROL =====
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;
if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            music.play().catch(() => {});
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const start = new Date('2025-12-01T00:00:00');
    const now = new Date();
    const diff = now - start;
    if (diff < 0) return;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const el = (id, v) => { const e = document.getElementById(id); if(e) e.textContent = v; };
    el('days', d); el('hours', h); el('minutes', m); el('seconds', s);
}
if (document.getElementById('days')) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// ===== TYPEWRITER EFFECT =====
const typedName = document.getElementById('typedName');
if (typedName) {
    const text = 'Khalida';
    let i = 0;
    typedName.innerHTML = '<span class="cursor"></span>';
    const cursor = typedName.querySelector('.cursor');
    function typeChar() {
        if (i < text.length) {
            typedName.insertBefore(document.createTextNode(text[i]), cursor);
            i++;
            setTimeout(typeChar, 120);
        }
    }
    setTimeout(typeChar, 800);
}

// ===== DAILY LOVE QUOTES =====
const loveQuotes = [
    {text: "Setiap cinta itu indah, tapi cerita kita adalah favoritku.", author: "Faiz untuk Khalida"},
    {text: "Kamu adalah hari ini dan semua hari esokku.", author: "Leo Christopher"},
    {text: "Di dalam dirimu, aku menemukan cinta dan sahabat sejati.", author: "Faiz"},
    {text: "Bersama adalah tempat favoritku.", author: "Faiz & Khalida"},
    {text: "Kamu adalah mentari di hari mendungku.", author: "Faiz"},
    {text: "Hatiku selamanya milikmu.", author: "Faiz untuk Ida"},
    {text: "Kamu membuat setiap hari layak dikenang.", author: "Faiz"},
    {text: "Bersamamu, selamanya pun tak cukup.", author: "Faiz & Khalida"},
    {text: "Kamu alasan aku percaya pada cinta.", author: "Faiz"},
    {text: "Setiap momen bersamamu adalah berkah.", author: "Faiz"},
    {text: "Kamu adalah petualangan terbesarku.", author: "Faiz untuk Khalida"},
    {text: "Mencintaimu adalah keputusan terbaik yang pernah kubuat.", author: "Faiz"},
    {text: "Kamu adalah tempat bahagiaku.", author: "Faiz & Khalida"},
    {text: "Cintaku padamu tumbuh lebih kuat setiap hari.", author: "Faiz"},
    {text: "Kamu potongan puzzle yang selama ini kucari.", author: "Faiz"},
    {text: "Terima kasih sudah menjadi segalanya.", author: "Faiz untuk Khalida"},
    {text: "Kamu membuat hatiku tersenyum.", author: "Faiz"},
    {text: "Aku jatuh cinta padamu lebih dalam setiap hari.", author: "Faiz"},
    {text: "Kamu adalah selamanya dan selaluku.", author: "Faiz & Khalida"},
    {text: "Bersamamu, aku pulang.", author: "Faiz"},
    {text: "Kamu berkah terbesarku.", author: "Faiz untuk Khalida"},
    {text: "Aku memilihmu, setiap hari.", author: "Faiz"},
    {text: "Saling belajar, saling menguatkan.", author: "Faiz & Khalida"},
    {text: "Mangaat idaa, pasti bisaa!", author: "Faiz"},
    {text: "Kalau bukan karena itu, kita gak akan pernah kenal dan dekat kaya sekarang.", author: "Faiz"},
    {text: "Aku bangga dengan Ida. Im proud of you.", author: "Faiz"},
    {text: "Semoga khalida dilancarkan dalam setiap ujian yang dihadapi.", author: "Faiz"},
    {text: "Kaya bakal seru deh nanti, kalau kita sama-sama sukses.", author: "Faiz"},
    {text: "Im here.. ida butuh bantuan aku bantu semampuku.", author: "Faiz"},
    {text: "You gave it your absolute best shot, and not everyone can do that, Khalida.", author: "Faiz"}
];
function getDailyQuote() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    return loveQuotes[dayOfYear % loveQuotes.length];
}
const quoteEl = document.getElementById('quote-text');
const authorEl = document.getElementById('quote-author');
if (quoteEl) {
    const q = getDailyQuote();
    quoteEl.textContent = q.text;
    if (authorEl) authorEl.textContent = '- ' + q.author;
}

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 0.5 + 0.1,
            speedX: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
            ctx.fill();
            p.y -= p.speedY;
            p.x += p.speedX;
            if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        scrollProgress.style.width = pct + '%';
    });
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollTopBtn.classList.add('visible');
        else scrollTopBtn.classList.remove('visible');
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== SCROLL REVEAL (fade-in elements) =====
const fadeEls = document.querySelectorAll('.fade-in');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
        }
    });
}, { threshold: 0.1 });
fadeEls.forEach(el => revealObserver.observe(el));

// ===== SPARKLE ON MOUSE =====
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.93) {
        const s = document.createElement('div');
        s.innerHTML = ['✨', '💛', '✦'][Math.floor(Math.random()*3)];
        s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;font-size:${12+Math.random()*12}px;z-index:9999;animation:sparkleAnim 1s forwards;`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    }
});
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `@keyframes sparkleAnim { 0% { opacity:1; transform:scale(0) rotate(0); } 100% { opacity:0; transform:scale(1.5) rotate(180deg) translateY(-20px); } }`;
document.head.appendChild(sparkleStyle);

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
if (lightbox) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.parentElement.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
}
