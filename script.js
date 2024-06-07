document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
    const playPauseBtn = document.getElementById('playPauseBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const trackList = document.getElementById('trackList');

    let isPlaying = false;
    let isRepeating = false;

    // Play/pause button event listener
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    // Repeat button event listener
    repeatBtn.addEventListener('click', () => {
        isRepeating = !isRepeating;
        audio.loop = isRepeating;
        repeatBtn.textContent = isRepeating ? 'Repeat: On' : 'Repeat: Off';
    });

    // Track selection event listener
    trackList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            audio.src = e.target.getAttribute('data-src');
            audio.play();
            playPauseBtn.textContent = 'Pause';
            isPlaying = true;
        }
    });

    // Reset play/pause button when audio ends
    audio.addEventListener('ended', () => {
        if (!isRepeating) {
            playPauseBtn.textContent = 'Play';
            isPlaying = false;
        }
    });
});

