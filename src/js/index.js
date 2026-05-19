window.addEventListener('load', () => {
    const container = document.getElementById('container');
    const intro = document.querySelector('netflixintro');
    const listProfiles = document.querySelector('.list-profiles');
    const audio = new Audio('src/assets/sounds/netflix-intro.mp3');
    audio.volume = 1.0;

    const startIntro = () => {
        if (!intro) return;
        container.classList.add('netflixintro-playing');
        audio.play().catch(() => {
            // autoplay may fail on some browsers without user interaction
        });
    };

    const hideIntro = () => {
        if (!intro) return;
        container.style.display = 'none';
    }

    const showListProfiles = () => {
        if (!listProfiles) return;
        listProfiles.style.display = 'flex';
    };

    setTimeout(startIntro, 2500);

    if (intro) {
        intro.addEventListener('animationend', (event) => {
            if (event.animationName === 'zoom-in') {
                setTimeout(() => {                    
                    hideIntro();
                    showListProfiles();
                }, 500);
            }
        });
    }
});
