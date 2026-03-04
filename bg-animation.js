// ===== ROMANTIC BACKGROUND ANIMATION =====
// Floating hearts, stars, sparkles + interactive mouse effects

(function() {
    'use strict';

    // --- CONFIG ---
    const EMOJIS = ['❤️', '💛', '💗', '✨', '🌟', '🌸', '🧡', '💞', '🌺', '⭐'];
    const MAX_FLOATING = 25;
    const SPAWN_INTERVAL = 1200;
    const SPARKLE_COLORS = ['#FFD700', '#FDB931', '#FFE55C', '#FFB6C1', '#FFDAB9', '#FF69B4', '#FFA500'];

    // --- CREATE CONTAINER ---
    const container = document.createElement('div');
    container.id = 'bg-anim-container';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
    document.body.prepend(container);

    // --- FLOATING EMOJIS ---
    let floatingCount = 0;

    function createFloatingEmoji() {
        if (floatingCount >= MAX_FLOATING) return;
        const el = document.createElement('div');
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        const size = 12 + Math.random() * 20;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 2;
        const sway = (Math.random() - 0.5) * 200;

        el.textContent = emoji;
        el.style.cssText = `
            position:absolute;
            bottom:-50px;
            left:${left}%;
            font-size:${size}px;
            opacity:0;
            pointer-events:none;
            animation:bgFloatUp ${duration}s ${delay}s ease-in-out forwards;
            --sway:${sway}px;
            filter:blur(${Math.random() > 0.7 ? 1 : 0}px);
        `;
        container.appendChild(el);
        floatingCount++;

        setTimeout(() => {
            el.remove();
            floatingCount--;
        }, (duration + delay) * 1000);
    }

    setInterval(createFloatingEmoji, SPAWN_INTERVAL);
    // Initial burst
    for (let i = 0; i < 8; i++) setTimeout(createFloatingEmoji, i * 200);

    // --- MOUSE SPARKLE TRAIL ---
    let lastSparkle = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastSparkle < 80) return;
        lastSparkle = now;

        const sparkle = document.createElement('div');
        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        const size = 4 + Math.random() * 8;
        sparkle.style.cssText = `
            position:fixed;
            left:${e.clientX - size/2}px;
            top:${e.clientY - size/2}px;
            width:${size}px;
            height:${size}px;
            background:${color};
            border-radius:50%;
            pointer-events:none;
            z-index:9999;
            animation:sparkleTrail 0.8s ease-out forwards;
            box-shadow:0 0 ${size}px ${color};
        `;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });

    // --- CLICK LOVE BURST ---
    document.addEventListener('click', function(e) {
        const burstEmojis = ['❤️', '💛', '✨', '💗', '🌟'];
        for (let i = 0; i < 6; i++) {
            const burst = document.createElement('div');
            const angle = (Math.PI * 2 / 6) * i;
            const dist = 30 + Math.random() * 40;
            const emoji = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
            burst.textContent = emoji;
            burst.style.cssText = `
                position:fixed;
                left:${e.clientX}px;
                top:${e.clientY}px;
                font-size:${14 + Math.random() * 10}px;
                pointer-events:none;
                z-index:9999;
                animation:loveBurst 0.8s ease-out forwards;
                --bx:${Math.cos(angle) * dist}px;
                --by:${Math.sin(angle) * dist}px;
            `;
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 800);
        }
    });

    // --- CURSOR HEART TRAIL (touch friendly) ---
    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const heart = document.createElement('div');
        heart.textContent = '💛';
        heart.style.cssText = `
            position:fixed;
            left:${touch.clientX}px;
            top:${touch.clientY}px;
            font-size:16px;
            pointer-events:none;
            z-index:9999;
            animation:sparkleTrail 1s ease-out forwards;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }, {passive: true});

    // --- SCROLL FADE-IN OBSERVER ---
    const fadeEls = document.querySelectorAll('.love-letter, .card, .stat-item, .fav-card, .game-card, .gallery-item, .letter-card, .daily-quote-box, .daily-quote, .countdown-container, .timeline-item');
    if (fadeEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
            observer.observe(el);
        });
    }

    // --- PARALLAX SUBTLE ON MOUSE ---
    const hero = document.querySelector('.hero, .msg-hero, .about-hero, .mem-hero, .game-hero, .page-hero');
    if (hero) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            hero.style.backgroundPosition = `${50 + x * 0.3}% ${50 + y * 0.3}%`;
        });
    }

    // --- INJECT KEYFRAMES ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bgFloatUp {
            0% { transform: translateY(0) translateX(0) rotate(0deg) scale(0.5); opacity: 0; }
            10% { opacity: 0.6; transform: translateY(-10vh) translateX(calc(var(--sway) * 0.2)) rotate(30deg) scale(0.8); }
            50% { opacity: 0.4; transform: translateY(-50vh) translateX(var(--sway)) rotate(180deg) scale(1); }
            90% { opacity: 0.2; }
            100% { transform: translateY(-110vh) translateX(calc(var(--sway) * -0.5)) rotate(360deg) scale(0.6); opacity: 0; }
        }
        @keyframes sparkleTrail {
            0% { opacity: 1; transform: scale(1) translateY(0); }
            100% { opacity: 0; transform: scale(0) translateY(-20px); }
        }
        @keyframes loveBurst {
            0% { opacity: 1; transform: translate(0, 0) scale(1); }
            100% { opacity: 0; transform: translate(var(--bx), var(--by)) scale(0.3); }
        }
    `;
    document.head.appendChild(style);

})();
