document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio();
    const playPauseBtn = document.getElementById('playPauseBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const trackList = document.getElementById('trackList');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const progress = document.getElementById('progress');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');

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

            audio.addEventListener('loadedmetadata', () => {
                durationEl.textContent = formatTime(audio.duration);
            });
        }
    });

    // Update progress bar and time display
    audio.addEventListener('timeupdate', () => {
        currentTimeEl.textContent = formatTime(audio.currentTime);
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
    });

    // Reset play/pause button when audio ends
    audio.addEventListener('ended', () => {
        if (!isRepeating) {
            playPauseBtn.textContent = 'Play';
            isPlaying = false;
        }
    });

    // Update playback speed
    speedRange.addEventListener('input', () => {
        const speed = speedRange.value;
        audio.playbackRate = speed;
        speedValue.textContent = speed;
    });

    // Format time in minutes and seconds
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});




