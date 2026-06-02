// 1. Grab the custom cursor
const cursor = document.querySelector('.custom-cursor');

// 2. Make the circle follow the mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 3. Find ALL clickable things (links and buttons)
const allClickables = document.querySelectorAll('a, button');

// 4. Make the cursor grow when it touches any clickable item
allClickables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
    });
});

// ==========================================
// 4.5 HAMBURGER MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu when a nav link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ==========================================
// 5. DARK MODE MEMORY ENGINE (Dark by Default)
// ==========================================
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    // 1. Check memory immediately to ensure the icons match the theme on load
    if (localStorage.getItem('portfolio-theme') === 'light') {
        document.body.classList.remove('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        // Add smooth fading class
        document.body.classList.add('theme-transition');

        // Flip the colors
        document.body.classList.toggle('dark-theme');

        // Save the new state to memory
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            localStorage.setItem('portfolio-theme', 'light');
        }
    });
}
// ==========================================
// 6. THE SMOOTH MULTI-LANGUAGE FUSION PRELOADER
// ==========================================
const preloader = document.getElementById('preloader');
const preloaderText = document.querySelector('.preloader-text');
const siteLogo = document.querySelector('.logo');

const ultimateFrenzyFrames = [
    { text: "TUSHAR DAS", font: "'Unbounded', sans-serif" },
    { text: "Tushar Das™", font: "'Syne', sans-serif" },
    { text: "TUSHAR", font: "'Anton', sans-serif" },
    { text: "トゥシャル・ダス", font: "'Noto Sans JP', sans-serif" },
    { text: "Tushar Das", font: "'Noto Sans JP', sans-serif" },
    { text: "Tushar Das", font: "'Bodoni Moda', serif" },
    { text: "TUSHAR DAS", font: "'Cinzel', serif" },
    { text: "トゥシャル", font: "'Noto Sans JP', sans-serif" },
    { text: "투샤르 다스", font: "'Noto Sans KR', sans-serif" },
    { text: "Tus.har Das", font: "'Space Grotesk', sans-serif" },
    { text: "TUSHAR", font: "'Bebas Neue', sans-serif" },
    { text: "トゥシャル・ダス", font: "'Noto Sans JP', sans-serif" },
    { text: "투샤르 다스", font: "'Noto Sans KR', sans-serif" },
    { text: "Tushar Das™", font: "'Unbounded', sans-serif" },
    { text: "투샤르", font: "'Noto Sans KR', sans-serif" },
    { text: "Tus.har", font: "'Space Grotesk', sans-serif" },
    { text: "Tushar Das", font: "'Bodoni Moda', serif" },
    { text: "TUSHAR", font: "'Syne', sans-serif" },
    { text: "Tushar Das™", font: "'Anton', sans-serif" },
    { text: "투샤르", font: "'Noto Sans KR', sans-serif" },
    { text: "Tushar Das™", font: "'Inter', sans-serif" }
];

if (preloader && preloaderText && siteLogo) {
    const navInfo = performance.getEntriesByType("navigation")[0];
    const isRefresh = navInfo && navInfo.type === "reload";

    if (isRefresh || !sessionStorage.getItem('intro-played')) {
        preloader.style.display = 'flex';

        setTimeout(() => {
            preloaderText.classList.add('run-wipe');

            setTimeout(() => {
                preloaderText.classList.add('hide-cursor', 'start-frenzy');

                let flashes = 0;

                const frenzyTimer = setInterval(() => {
                    const frame = ultimateFrenzyFrames[Math.floor(Math.random() * ultimateFrenzyFrames.length)];
                    preloaderText.style.fontFamily = frame.font;
                    preloaderText.textContent = frame.text;
                    flashes++;

                    if (flashes >= 13) {
                        clearInterval(frenzyTimer);

                        // Temporarily freeze CSS to calculate math perfectly
                        preloaderText.classList.remove('start-frenzy');
                        preloaderText.style.transition = 'none';

                        preloaderText.style.fontFamily = "'Inter', sans-serif";
                        preloaderText.textContent = "Tushar Das™";

                        const textRect = preloaderText.getBoundingClientRect();
                        preloaderText.style.left = textRect.left + 'px';
                        preloaderText.style.top = textRect.top + 'px';
                        preloaderText.style.transform = 'none';
                        preloaderText.style.animation = 'none';
                        preloaderText.style.transformOrigin = 'top left';

                        preloaderText.getBoundingClientRect();

                        const logoRect = siteLogo.getBoundingClientRect();
                        const moveX = logoRect.left - textRect.left;
                        const moveY = logoRect.top - textRect.top;
                        const scale = logoRect.height / textRect.height;

                        // UNLOCK CSS so the flight and fade can actually happen!
                        preloaderText.style.transition = '';

                        // Trigger Fusion Flight
                        preloader.classList.add('fuse-bg');
                        preloaderText.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
                        preloaderText.classList.add('fuse-text');

                        setTimeout(() => {
                            preloader.classList.add('preloader-hidden');
                            sessionStorage.setItem('intro-played', 'true');
                        }, 1200);
                    }
                }, 160);

            }, 1000);

        }, 800);

    } else {
        preloader.style.display = 'none';
    }
}

// ==========================================
// 7. CIPHER SCRAMBLE TEXT ANIMATION
// ==========================================
const typewriterEl = document.getElementById('typewriter-text');
const typewriterSub = document.getElementById('typewriter-sub');

if (typewriterEl) {
    const fullText = typewriterEl.getAttribute('data-text');
    const glyphs = '!@#$%^&*()_+-=[]{}|;:,.<>?/~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Create a span for each character
    typewriterEl.innerHTML = fullText
        .split('')
        .map((ch, i) => `<span class="char" data-index="${i}" data-final="${ch}">${ch === ' ' ? '&nbsp;' : '&nbsp;'}</span>`)
        .join('');

    const chars = typewriterEl.querySelectorAll('.char');

    function scrambleChar(span, finalChar, resolveDelay) {
        if (finalChar === ' ') {
            // Spaces resolve instantly
            span.innerHTML = '&nbsp;';
            span.classList.add('decoded');
            return;
        }

        let scrambleCount = 0;
        const maxScrambles = 4 + Math.floor(Math.random() * 6); // 4-9 flickers

        // Start scrambling immediately
        span.classList.add('scrambling');

        const flickerInterval = setInterval(() => {
            span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            scrambleCount++;

            if (scrambleCount >= maxScrambles) {
                clearInterval(flickerInterval);
                // Lock in the final character
                span.textContent = finalChar;
                span.classList.remove('scrambling');
                span.classList.add('decoded');
            }
        }, 50);
    }

    // Start the animation after a delay
    setTimeout(() => {
        chars.forEach((span, i) => {
            const finalChar = span.getAttribute('data-final');
            // Stagger each character's start by 60ms
            setTimeout(() => scrambleChar(span, finalChar, i), i * 60);
        });

        // Fade in subtitle after all characters are done
        const totalTime = chars.length * 60 + 500;
        setTimeout(() => {
            const subs = document.querySelectorAll('.hero-sub');
            subs.forEach(sub => {
                sub.classList.remove('hidden');
                sub.classList.add('visible');
            });
        }, totalTime);
    }, 1500);
}