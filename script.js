// ===== HAMBURGER MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu') || document.querySelector('.nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
document.querySelectorAll('.nav-menu a, .nav-links a').forEach(a => {
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

// ===== AUTO-ROTATING LOVE QUOTES (from our real chats) =====
const loveQuotes = [
    {text: "Semoga khalida dilancarkan dalam setiap ujian yang dihadapi biar bisa menjadi pribadi yang lebih baik.", author: "Faiz"},
    {text: "Kalau bukan karena itu, aku sama kamu gak akan pernah kenal dan dekat kaya sekarang.", author: "Faiz"},
    {text: "Kaya bakal seru deh nanti, kalau kita sama-sama sukses.. trus bisa sharing cerita.", author: "Faiz"},
    {text: "Im here.. Ida butuh bantuan aku bantu semampuku.", author: "Faiz"},
    {text: "You gave it your absolute best shot, and not everyone can do that, Khalida.", author: "Faiz"},
    {text: "Aku bangga dengan Ida. Im proud of you.", author: "Faiz"},
    {text: "I'm really grateful to have a friend like you who shows me the value of growth and perseverance.", author: "Faiz"},
    {text: "Let's grab a coffee again sometime soon. I really miss those good talks over a cup of coffee.", author: "Faiz"},
    {text: "May Allah always bless you with strength, health, and success in every step you take.", author: "Faiz"},
    {text: "Semua perjuangan terbayar sirna. Selamat yahh Khalida!", author: "Faiz"},
    {text: "Relaksasikan juga dirimu okayy. Kamu sudah berusaha keras.", author: "Faiz"},
    {text: "Percaya laah ke Ida. Kalau ada yang bingung aku bantu.", author: "Faiz"},
    {text: "Makasih juga udah mau berbagi cerita. Saling belajar.", author: "Faiz"},
    {text: "Langkah selanjutnya insyaallah dimudahkan.", author: "Faiz"},
    {text: "Tumbang di waktu krusial sangat tidak rekomended. Jaga kesehatan yahh!", author: "Faiz"},
    {text: "Terimakasih for today yahh Ida!", author: "Faiz"},
    {text: "Asalkan sudah sampai... tidak apa. Take your time Ida.", author: "Faiz"},
    {text: "Mangaat Ida, pasti bisaa!", author: "Faiz"},
    {text: "Demi mencari ilmu mah ngapain gengsi. Derajat ilmu lebih tinggi dari harga diri.", author: "Faiz"},
    {text: "Let's continue to encourage each other on this journey.", author: "Faiz"},
    {text: "Bismillah semoga maksimal. Dilancarkan semua urusannya.", author: "Faiz"},
    {text: "Hati-hati di jalan yah Ida.", author: "Faiz"},
    {text: "Bisa Lida bisa! Pastii bisaa!", author: "Faiz"},
    {text: "Lucu banget siihh Ida.", author: "Faiz"},
    {text: "Good memories broo. Nostalgic banget.", author: "Faiz"},
    {text: "Sorry gak bisa nemenin hari ini...", author: "Faiz"},
    {text: "Menghangatkan diri yahh. Pasti dijalan dingin banget tuhh.", author: "Faiz"},
    {text: "Aku mau jenguk. Sekalian ketemu.", author: "Faiz"},
    {text: "Bangga sekali melihat anak bimbing saya.", author: "Faiz"},
    {text: "Setiap detik bersamamu adalah keajaiban.", author: "F & K"}
];

let quoteIndex = 0;
const quoteEl = document.getElementById('quote-text');
const authorEl = document.getElementById('quote-author');

function showQuote(idx) {
    if (!quoteEl) return;
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(10px)';
    setTimeout(() => {
        quoteEl.textContent = '"' + loveQuotes[idx].text + '"';
        if (authorEl) authorEl.textContent = '- ' + loveQuotes[idx].author;
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
    }, 500);
}

if (quoteEl) {
    quoteEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    showQuote(0);
    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % loveQuotes.length;
        showQuote(quoteIndex);
    }, 4000);
}

// ===== PARTICLE CANVAS (hearts + stars) =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const symbols = ['\u2764', '\u2726', '\u273F', '\u2605', '\uD83D\uDC9B', '\u2728'];
    for (let i = 0; i < 35; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 14 + 8,
            speedY: Math.random() * 0.6 + 0.2,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.4 + 0.1,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 1.5
        });
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.font = p.size + 'px serif';
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillText(p.symbol, 0, 0);
            ctx.restore();
            p.y -= p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;
            if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
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

// ===== SCROLL REVEAL =====
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
    if (Math.random() > 0.92) {
        const s = document.createElement('div');
        const emojis = ['\u2728','\uD83D\uDC9B','\uD83C\uDF38','\u2B50','\u2726'];
        s.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
        s.style.cssText = 'position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;pointer-events:none;font-size:'+(10+Math.random()*14)+'px;z-index:9999;animation:sparkleAnim 1s forwards;';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    }
});
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = '@keyframes sparkleAnim { 0% { opacity:1; transform:scale(0) rotate(0); } 100% { opacity:0; transform:scale(1.5) rotate(180deg) translateY(-25px); } }';
document.head.appendChild(sparkleStyle);

// ===== FLOATING HEARTS ON CLICK =====
document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        const h = document.createElement('div');
        const emojis = ['\uD83D\uDC9B','\u2764\uFE0F','\u2728','\uD83C\uDF38','\u2B50'];
        h.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 60;
        const dx = Math.cos(angle)*dist;
        const dy = Math.sin(angle)*dist;
        h.style.cssText = 'position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;pointer-events:none;font-size:'+(14+Math.random()*10)+'px;z-index:9999;transition:all 0.8s ease-out;opacity:1;';
        document.body.appendChild(h);
        requestAnimationFrame(() => {
            h.style.transform = 'translate('+dx+'px,'+dy+'px) scale(1.2)';
            h.style.opacity = '0';
        });
        setTimeout(() => h.remove(), 800);
    }
});

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

// ===== ANIMATED LOGO PULSE =====
const logo = document.querySelector('.logo');
if (logo) {
    logo.style.transition = 'transform 0.3s ease';
    setInterval(() => {
        logo.style.transform = 'scale(1.08)';
        setTimeout(() => { logo.style.transform = 'scale(1)'; }, 300);
    }, 3000);
}

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.stat-item, .glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(600px) rotateY('+x*8+'deg) rotateX('+(-y*8)+'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    });
    card.style.transition = 'transform 0.3s ease';
});
