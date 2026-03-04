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

// ===== PERSISTENT MUSIC CONTROL (YouTube iframe + localStorage) =====
(function() {
    const musicToggle = document.getElementById('musicToggle');
    const ytPlayer = document.getElementById('ytPlayer');
    const MUSIC_KEY = 'faizlida_music';
    const YT_URL = 'https://www.youtube.com/embed/Bu70OmGc1fg?autoplay=1&loop=1&playlist=Bu70OmGc1fg&controls=0';
    function getMusicState() {
        try { return JSON.parse(localStorage.getItem(MUSIC_KEY)) || {}; } catch(e) { return {}; }
    }
    function setMusicState(state) {
        localStorage.setItem(MUSIC_KEY, JSON.stringify(state));
    }
    function startMusic() {
        if (ytPlayer) { ytPlayer.src = YT_URL; }
        setMusicState({ playing: true, startedAt: Date.now() });
        if (musicToggle) {
            musicToggle.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    function stopMusic() {
        if (ytPlayer) ytPlayer.src = '';
        setMusicState({ playing: false });
        if (musicToggle) {
            musicToggle.style.background = '';
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
    }
    var state = getMusicState();
    if (state.playing && ytPlayer) {
        ytPlayer.src = YT_URL;
        if (musicToggle) {
            musicToggle.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            var current = getMusicState();
            if (current.playing) { stopMusic(); } else { startMusic(); }
        });
    }
})();

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    var start = new Date('2025-12-01T00:00:00+07:00');
    var now = new Date();
    var diff = now - start;
    if (diff < 0) {
        var setEl = function(id, v) { var e = document.getElementById(id); if(e) e.textContent = v; };
        setEl('days', '0'); setEl('hours', '0'); setEl('minutes', '0'); setEl('seconds', '0');
        return;
    }
    var totalSeconds = Math.floor(diff / 1000);
    var d = Math.floor(totalSeconds / 86400);
    var h = Math.floor((totalSeconds % 86400) / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    var s = totalSeconds % 60;
    var setEl2 = function(id, v) { var e = document.getElementById(id); if(e) e.textContent = v; };
    setEl2('days', d); setEl2('hours', h); setEl2('minutes', m); setEl2('seconds', s);
}
if (document.getElementById('days')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== TYPEWRITER EFFECT =====
var typedName = document.getElementById('typedName');
if (typedName) {
    var text = 'Khalida';
    var charIdx = 0;
    typedName.innerHTML = '';
    var cursor = typedName.querySelector('.cursor');
    function typeChar() {
        if (charIdx < text.length) {
            typedName.insertBefore(document.createTextNode(text[charIdx]), cursor);
            charIdx++;
            setTimeout(typeChar, 120);
        }
    }
    setTimeout(typeChar, 800);
}

// ===== AUTO-ROTATING LOVE QUOTES =====
var loveQuotes = [
    {text: "Hati hati di jalan yah.", author: "Faiz"},
    {text: "Makasih juga udah mau berbagi cerita. Saling belajar.", author: "Faiz"},
    {text: "Bismillaah, sehat sehatt, Allah lancariiin broo.", author: "Khalida"},
    {text: "Mangatt benrin skripsinya ahahaha.", author: "Faiz"},
    {text: "Entar skripsian bareng lagi yo.", author: "Faiz"},
    {text: "Idaa semangatt! Aku dah beres, kalo ida butuh bantuan aku sanss aja.", author: "Faiz"},
    {text: "Diberikan kelancaran yahh dan hasilnya membawa manfaat.", author: "Faiz"},
    {text: "Udah acc mah bisa nyantaii. Nikmat bangtt.", author: "Faiz"},
    {text: "Pastii bisaa lidaa! Buktinya sekarang dah acc.", author: "Faiz"},
    {text: "Langkah selanjutnya insyaallah dimudahkan.", author: "Faiz"},
    {text: "Aku bangga dengan idaa. Im proud of you.", author: "Faiz"},
    {text: "Semua perjuangan terbayar sirna. Selamat yahh Khalidaaa.", author: "Faiz"},
    {text: "Hayu nih kapan.. kita ngopi tapi dilarang bawa laptop.", author: "Faiz"},
    {text: "Bangga sekali melihat anak bimbing saya.", author: "Faiz"},
    {text: "Aku ngetag nya ke akun yg mana yah.", author: "Faiz"},
    {text: "Good memoriess broo. Nostalgic bngt.", author: "Faiz"},
    {text: "Kalau bukan karena ini.. aku sama km gk akan pernah kenal dan dekat kaya sekarang.", author: "Faiz"},
    {text: "You gave it your absolute best shot, and not everyone can do that, Khalidaa.", author: "Faiz"},
    {text: "Semoga khalida dilancarkan dalam setiap ujian yg dihadapi biar bisa menjadi pribadi yg lebih baik.", author: "Faiz"},
    {text: "Kaya bakal seru deh nanti, kalau kita sama sama sukses.. trus bisa sharing cerita.", author: "Faiz"},
    {text: "Im here.. ida butuh bantuan aku bantu semampuku.", author: "Faiz"},
    {text: "I'm really grateful to have a friend like you who shows me the value of growth and perseverance.", author: "Faiz"},
    {text: "Let's grab a coffee again sometime soon. I really miss those good talks over a cup of coffee.", author: "Faiz"},
    {text: "May Allah always bless you with strength, health, and success in every step you take.", author: "Faiz"},
    {text: "Let's continue to encourage each other on this journey.", author: "Faiz"},
    {text: "Jaga kesehatan yahh. Tumbang di waktu krusial sangat tidak rekomended.", author: "Faiz"},
    {text: "Terimakasih for today yahh idaa.", author: "Faiz"},
    {text: "Asalkan sudah sampai... tidak apa. Take your time Ida.", author: "Faiz"},
    {text: "Mangaat Ida, pasti bisaa!", author: "Faiz"},
    {text: "Demi mencari ilmu mah ngapain gengsi. Derajat ilmu lebih tinggi dari harga diri.", author: "Faiz"},
    {text: "Percaya laah ke idaa. Kalau ada yg bingung biasanya juga nanya ke aku.", author: "Faiz"},
    {text: "Relaksasikan juga dirimu okayy. Kamu sudah berusaha keras.", author: "Faiz"},
    {text: "Bismillah semoga maksimal. Dilancarkan semua urusannya.", author: "Faiz"},
    {text: "Hati-hati di jalan yah Ida.", author: "Faiz"},
    {text: "Bisa Lida bisa! Pastii bisaa!", author: "Faiz"},
    {text: "Lucu banget siihh idaa.", author: "Faiz"},
    {text: "Sorry gak bisa nemenin hari ini...", author: "Faiz"},
    {text: "Menghangatkan diri yahh. Pasti dijalan dingin banget tuhh.", author: "Faiz"},
    {text: "Aku mau jenguk. Sekalian ketemu.", author: "Faiz"},
    {text: "Semoga besok dah sembuh yaa.", author: "Faiz"},
    {text: "Besok di lancarkan dan dipermudah semua urusannya yahh.", author: "Faiz"},
    {text: "Ayo lidaa pasti bisaa minggu besok beres semuaa.", author: "Faiz"},
    {text: "Lida jugaa aminnn.", author: "Faiz"},
    {text: "Ngerjain bareng lagi yu idaa.", author: "Faiz"},
    {text: "Moga lancar juga yah idaa.", author: "Faiz"},
    {text: "Bisa pasti bisaa. Bisa gilaa.", author: "Faiz"},
    {text: "Idaa ke east indies tidak?", author: "Faiz"},
    {text: "Istirahat yah idaa.", author: "Faiz"},
    {text: "Kabarin yah kalau otw.", author: "Faiz"},
    {text: "Aku lgi di jogja ahahaha.", author: "Faiz"},
    {text: "Sambil remote daa kordinasinya.", author: "Faiz"},
    {text: "Semoga diberikan kelancaran broo.", author: "Faiz"},
    {text: "Sukses yahh idaa.", author: "Faiz"},
    {text: "Dilancarkannn aminnn.", author: "Faiz"},
    {text: "Semangatt cuman itu sih yg bisa aku bilang.", author: "Faiz"},
    {text: "Istoqamah atuh... judulnya aja counternaratif ya nanti dri bab 1 sampe 5 masih bahas counternaratif.", author: "Faiz"},
    {text: "Teguh pendirian yahh. Hindari improve yng bakal bikin km pusing sendiri.", author: "Faiz"},
    {text: "Idaa kalau mau ngobrol ngobrol ayoo ajaa.. di podcast kaya kemaren juga hayuu.", author: "Faiz"},
    {text: "Rehat yah kak. Jaga kesehatan juga okay.", author: "Faiz"},
    {text: "Makasih idaa selalu surprot akuu. Jadi semangatt bngt nih.", author: "Faiz"},
    {text: "Terima kasih faiz sudah selalu berjuang sejauh ini!", author: "Khalida"},
    {text: "Oyasumiii.", author: "Faiz"},
    {text: "Mending beresin skripsii.", author: "Faiz"},
    {text: "Aku dah beres, kalo ida butuh bantuan aku sanss aja.", author: "Faiz"},
    {text: "Ida juga ganbatte yahh.", author: "Faiz"},
    {text: "Menangg anjr. Gold medall!", author: "Faiz"},
    {text: "Mana nihh aku mau upp. Aku bangga dengan idaa. Im proud of you.", author: "Faiz"},
    {text: "Idaaa aku sidang hari rabu.", author: "Faiz"},
    {text: "Selamat yahh khalidaaa. Semua perjuangan terbayar sirna. Gg.", author: "Faiz"},
    {text: "Akhirnyaa ida beres jugaa.", author: "Faiz"},
    {text: "Moga aja besok gk bangun kesiangan.", author: "Faiz"},
    {text: "Harus dikerjakan. Aaaaa idaa.", author: "Faiz"},
    {text: "Kerjainn hayo.", author: "Faiz"},
    {text: "SELAMATTTT FAAIIIZZZZ! I knew it landas dengan gagah.", author: "Khalida"},
    {text: "FAIZ! I just want to say thank you for all the support and help you've given me.", author: "Khalida"},
    {text: "Terimakasi banyak faiiz atas semua doa dukungan semangat dan bimbingan professor saat d butuhkan.", author: "Khalida"},
    {text: "Terimakasiiiih banyaaaakkkk. Berkabar jika sudah sampai.", author: "Khalida"},
    {text: "Bismillaah, Allaah pasti beri kemampuan terkeren untuk faiz buat acara besok! Break a leg.", author: "Khalida"},
    {text: "Se berat apapun mari kita lihat itu sebagai cara Allah naikin diri ke step yang lebih tinggi.", author: "Khalida"},
    {text: "Semoga keberkahan, kesehatan, kesuksesan dari Allah selalu menyertaiii.", author: "Khalida"},
    {text: "Bener ko lagi menikmati setiap proses.", author: "Khalida"},
    {text: "Aku semangat!", author: "Khalida"},
    {text: "Syafakallah syifaan ajilan syifaan laa yughadiru ba'dahu saqaman.", author: "Khalida"},
    {text: "Istirahaat yg banyak biar pulihnya fresh.", author: "Khalida"},
    {text: "Bismillah beres malem ini satu satu pelan pelan lida bisa.", author: "Khalida"},
    {text: "Alhamdulillah masih banyak waktu buat belajar.", author: "Khalida"},
    {text: "Pastii bisaa lah professeur!", author: "Khalida"},
    {text: "Doa baik berbaliik, best luck broo!", author: "Khalida"},
    {text: "Bisa pasti bisaa! Bisa Lida bisa beres.", author: "Khalida"},
    {text: "Ini sangat lebih dari cukup dari yg di harapin.", author: "Khalida"},
    {text: "Aamiin doain aku nyusul yaaaa.", author: "Khalida"},
    {text: "Congrats broo! Guess who's snagged an award todayyy.", author: "Khalida"},
    {text: "That's insane brooo! Gold medall!", author: "Khalida"},
    {text: "Semangat semangattt!! Lesssgooo!", author: "Khalida"},
    {text: "Revisi insyaallah d kumpulin senin! Doainn!", author: "Khalida"},
    {text: "No more sad, go fight for it man.", author: "Khalida"},
    {text: "Tenangkan yakin usaha sampaai.", author: "Khalida"},
    {text: "Faiz juga semangat besok coronation day anjai anjai.", author: "Khalida"},
    {text: "Terimakasiw banyak sudah selalu bantuu.", author: "Khalida"},
    {text: "It means a lot, ur time.", author: "Khalida"},
    {text: "Setiap detik bersamamu adalah keajaiban.", author: "F & K"}
];
var quoteIndex = 0;
var quoteEl = document.getElementById('quote-text');
var authorEl = document.getElementById('quote-author');
function showQuote(idx) {
    if (!quoteEl) return;
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(10px)';
    setTimeout(function() {
        quoteEl.textContent = '"' + loveQuotes[idx].text + '"';
        if (authorEl) authorEl.textContent = '- ' + loveQuotes[idx].author;
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
    }, 500);
}
if (quoteEl) {
    quoteEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    showQuote(0);
    setInterval(function() { quoteIndex = (quoteIndex + 1) % loveQuotes.length; showQuote(quoteIndex); }, 4000);
}

// ===== PARTICLE CANVAS =====
var canvas = document.getElementById('particleCanvas');
if (canvas) {
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var particles = [];
    var symbols = ['\u2764', '\u2726', '\u273F', '\u2605', '\uD83D\uDC9B', '\u2728'];
    for (var pi = 0; pi < 35; pi++) {
        particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*14+8, speedY: Math.random()*0.6+0.2, speedX: Math.random()*0.4-0.2, opacity: Math.random()*0.4+0.1, symbol: symbols[Math.floor(Math.random()*symbols.length)], rotation: Math.random()*360, rotSpeed: (Math.random()-0.5)*1.5 });
    }
    function animateParticles() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(function(p) {
            ctx.save(); ctx.globalAlpha=p.opacity; ctx.font=p.size+'px serif'; ctx.translate(p.x,p.y); ctx.rotate(p.rotation*Math.PI/180); ctx.fillText(p.symbol,0,0); ctx.restore();
            p.y-=p.speedY; p.x+=p.speedX; p.rotation+=p.rotSpeed;
            if(p.y<-20){p.y=canvas.height+20;p.x=Math.random()*canvas.width;}
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize',function(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
}

// ===== SCROLL PROGRESS BAR =====
var scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', function() {
        var total = document.documentElement.scrollHeight - window.innerHeight;
        var pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        scrollProgress.style.width = pct + '%';
    });
}

// ===== SCROLL TO TOP =====
var scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) scrollTopBtn.classList.add('visible');
        else scrollTopBtn.classList.remove('visible');
    });
    scrollTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ===== SCROLL REVEAL =====
var fadeEls = document.querySelectorAll('.fade-in');
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
        if (entry.isIntersecting) setTimeout(function() { entry.target.classList.add('visible'); }, i * 100);
    });
}, { threshold: 0.1 });
fadeEls.forEach(function(el) { revealObserver.observe(el); });

// ===== SPARKLE ON MOUSE =====
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.92) {
        var s = document.createElement('div');
        var emojis = ['\u2728','\uD83D\uDC9B','\uD83C\uDF38','\u2B50','\u2726'];
        s.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
        s.style.cssText = 'position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;pointer-events:none;font-size:'+(10+Math.random()*14)+'px;z-index:9999;animation:sparkleAnim 1s forwards;';
        document.body.appendChild(s);
        setTimeout(function() { s.remove(); }, 1000);
    }
});
var sparkleStyle = document.createElement('style');
sparkleStyle.textContent = '@keyframes sparkleAnim { 0% { opacity:1; transform:scale(0) rotate(0); } 100% { opacity:0; transform:scale(1.5) rotate(180deg) translateY(-25px); } }';
document.head.appendChild(sparkleStyle);

// ===== FLOATING HEARTS ON CLICK =====
document.addEventListener('click', function(e) {
    for (var fi = 0; fi < 5; fi++) {
        var h = document.createElement('div');
        var emojis2 = ['\uD83D\uDC9B','\u2764\uFE0F','\u2728','\uD83C\uDF38','\u2B50'];
        h.innerHTML = emojis2[Math.floor(Math.random()*emojis2.length)];
        var angle = Math.random()*Math.PI*2;
        var dist = 30+Math.random()*60;
        var dx = Math.cos(angle)*dist;
        var dy = Math.sin(angle)*dist;
        h.style.cssText = 'position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;pointer-events:none;font-size:'+(14+Math.random()*10)+'px;z-index:9999;transition:all 0.8s ease-out;opacity:1;';
        document.body.appendChild(h);
        (function(el, ddx, ddy) { requestAnimationFrame(function() { el.style.transform='translate('+ddx+'px,'+ddy+'px) scale(1.2)'; el.style.opacity='0'; }); })(h, dx, dy);
        setTimeout(function(el) { return function() { el.remove(); }; }(h), 800);
    }
});

// ===== LIGHTBOX =====
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
if (lightbox) {
    document.querySelectorAll('.gallery-item img').forEach(function(img) {
        img.parentElement.addEventListener('click', function() { lightboxImg.src = img.src; lightbox.classList.add('active'); });
    });
    lightbox.addEventListener('click', function() { lightbox.classList.remove('active'); });
}

// ===== ANIMATED LOGO PULSE =====
var logo = document.querySelector('.logo');
if (logo) {
    logo.style.transition = 'transform 0.3s ease';
    setInterval(function() { logo.style.transform='scale(1.08)'; setTimeout(function(){logo.style.transform='scale(1)';},300); }, 3000);
}

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.stat-item, .glass-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX-rect.left)/rect.width-0.5;
        var y = (e.clientY-rect.top)/rect.height-0.5;
        card.style.transform = 'perspective(600px) rotateY('+x*8+'deg) rotateX('+(-y*8)+'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() { card.style.transform='perspective(600px) rotateY(0) rotateX(0) scale(1)'; });
    card.style.transition = 'transform 0.3s ease';
});
