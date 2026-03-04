// ===== ROMANTIC BACKGROUND ANIMATION =====
(function() {
    'use strict';
    const EMOJIS = ['❤️', '💛', '💗', '✨', '🌟', '🌸', '🧡', '💞', '🌺', '⭐'];
    const MAX_FLOATING = 20;
    const SPAWN_INTERVAL = 1400;
    const SPARKLE_COLORS = ['#FFD700','#FDB931','#FFE55C','#FFB6C1','#FFDAB9','#FF69B4','#FFA500'];

    const container = document.createElement('div');
    container.id = 'bg-anim-container';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
    document.body.prepend(container);

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
        el.style.cssText = `position:absolute;bottom:-50px;left:${left}%;font-size:${size}px;opacity:0;pointer-events:none;animation:bgFloatUp ${duration}s ${delay}s ease-in-out forwards;--sway:${sway}px;`;
        container.appendChild(el);
        floatingCount++;
        setTimeout(() => { el.remove(); floatingCount--; }, (duration + delay) * 1000);
    }
    setInterval(createFloatingEmoji, SPAWN_INTERVAL);
    for (let i = 0; i < 8; i++) setTimeout(createFloatingEmoji, i * 200);

    let lastSparkle = 0;
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastSparkle < 80) return;
        lastSparkle = now;
        const sparkle = document.createElement('div');
        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        const size = 4 + Math.random() * 8;
        sparkle.style.cssText = `position:fixed;left:${e.clientX - size/2}px;top:${e.clientY - size/2}px;width:${size}px;height:${size}px;background:${color};border-radius:50%;pointer-events:none;z-index:9999;animation:sparkleTrail 0.8s ease-out forwards;box-shadow:0 0 ${size}px ${color};`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });

    document.addEventListener('click', function(e) {
        const burstEmojis = ['❤️','💛','✨','💗','🌟'];
        for (let i = 0; i < 6; i++) {
            const burst = document.createElement('div');
            const angle = (Math.PI * 2 / 6) * i;
            const dist = 30 + Math.random() * 40;
            const emoji = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
            burst.textContent = emoji;
            burst.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:${14 + Math.random() * 10}px;pointer-events:none;z-index:9999;animation:loveBurst 0.8s ease-out forwards;--bx:${Math.cos(angle) * dist}px;--by:${Math.sin(angle) * dist}px;`;
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 800);
        }
    });

    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const heart = document.createElement('div');
        heart.textContent = '💛';
        heart.style.cssText = `position:fixed;left:${touch.clientX}px;top:${touch.clientY}px;font-size:16px;pointer-events:none;z-index:9999;animation:sparkleTrail 1s ease-out forwards;`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }, {passive: true});

    // Scroll fade-in - SAFE version (shows elements already in viewport)
    setTimeout(function() {
        const SELECTORS = '.love-letter,.card,.stat-item,.fav-card,.game-card,.gallery-item,.letter-card,.daily-quote-box,.daily-quote,.countdown-container,.timeline-item,.rss-section,.letters-section';
        const fadeEls = document.querySelectorAll(SELECTORS);
        if (!fadeEls.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
        fadeEls.forEach((el, i) => {
            el.classList.add('anim-hidden');
            el.style.setProperty('--anim-delay', (i % 6 * 0.08) + 's');
            observer.observe(el);
        });
    }, 100);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes bgFloatUp {
            0%{transform:translateY(0) translateX(0) rotate(0deg) scale(0.5);opacity:0}
            10%{opacity:0.6;transform:translateY(-10vh) translateX(calc(var(--sway)*0.2)) rotate(30deg) scale(0.8)}
            50%{opacity:0.4;transform:translateY(-50vh) translateX(var(--sway)) rotate(180deg) scale(1)}
            90%{opacity:0.2}
            100%{transform:translateY(-110vh) translateX(calc(var(--sway)*-0.5)) rotate(360deg) scale(0.6);opacity:0}
        }
        @keyframes sparkleTrail {
            0%{opacity:1;transform:scale(1) translateY(0)}
            100%{opacity:0;transform:scale(0) translateY(-20px)}
        }
        @keyframes loveBurst {
            0%{opacity:1;transform:translate(0,0) scale(1)}
            100%{opacity:0;transform:translate(var(--bx),var(--by)) scale(0.3)}
        }
        @keyframes animFadeIn {
            from{opacity:0;transform:translateY(25px)}
            to{opacity:1;transform:translateY(0)}
        }
        .anim-hidden{opacity:0;transform:translateY(25px);transition:none !important}
        .anim-visible{animation:animFadeIn 0.6s var(--anim-delay, 0s) ease forwards !important}
    `;
    document.head.appendChild(style);
})();
