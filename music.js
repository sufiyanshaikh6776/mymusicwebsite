// Define a Playlist class
class Playlist {
    constructor() {
        this.songs = [];
        this.currentSongIndex = 0;
    }

    addSong(song) {
        this.songs.push(song);
    }

    playNext() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        return this.songs[this.currentSongIndex];
    }

    playPrev() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
        return this.songs[this.currentSongIndex];
    }
}

// Create a playlist instance
const playlist = new Playlist();
playlist.addSong({ title: "Apna Banale Priya", artist: "Artist 1", image: "img1.jpg", audio: "music1.mp3", length: "3:24" });
playlist.addSong({ title: "Falak tu Garaj Tu", artist: "Artist 2", image: "falaktu.jpg", audio: "falaktu.mp3", length: "2:51" });
playlist.addSong({ title: "Mehbooba ", artist: "Artist 3", image: "mehbooba.jpg", audio: "mehbooba.mp3", length: "3:38" });
// Add more songs as needed

// Function to update the UI with current song info
function updateSongInfo(song) {
    document.getElementById('audioPlayer').src = song.audio;
    document.getElementById('currentSongTitle').textContent = `Current Song: ${song.title} - ${song.artist}`;
    document.getElementById('currentSongProgress').textContent = `Song Progress: 0:00 / ${song.length}`;
}

// Function to update the song progress bar
function updateProgressBar() {
    const audioPlayer = document.getElementById('audioPlayer');
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    if (!isNaN(duration)) {
        const progressPercentage = (currentTime / duration) * 100;
        document.querySelector('.progress-bar .progress').style.width = `${progressPercentage}%`;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        document.getElementById('currentSongProgress').textContent = `Song Progress: ${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    }
}

// Event listeners for controlling the music player
document.getElementById('playBtn').addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('playBtn').innerText = "Pause";
    } else {
        audioPlayer.pause();
        document.getElementById('playBtn').innerText = "Play";
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const nextSong = playlist.playNext();
    if (nextSong) {
        updateSongInfo(nextSong);
        document.getElementById('audioPlayer').play();
        document.getElementById('playBtn').innerText = "Pause";
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    const prevSong = playlist.playPrev();
    if (prevSong) {
        updateSongInfo(prevSong);
        document.getElementById('audioPlayer').play();
        document.getElementById('playBtn').innerText = "Pause";
    }
});

// Update song progress in real-time
const audioPlayer = document.getElementById('audioPlayer');
audioPlayer.addEventListener('timeupdate', updateProgressBar);

// Initial setup: Play the first song
updateSongInfo(playlist.songs[0]);

// Function to rotate the playlist up
function rotateUp() {
    const playlistWrapper = document.querySelector('.playlist-wrapper');
    playlistWrapper.classList.remove('rotate-down');
    playlistWrapper.classList.add('rotate-up');
}

// Function to rotate the playlist down
function rotateDown() {
    const playlistWrapper = document.querySelector('.playlist-wrapper');
    playlistWrapper.classList.remove('rotate-up');
    playlistWrapper.classList.add('rotate-down');
}

// Function to handle image click event
function handleImageClick(event) {
    const audioPlayer = document.getElementById('audioPlayer');
    const songTitle = event.target.getAttribute('data-title');
    const audioSrc = event.target.getAttribute('data-audio');

    // Update audio player with clicked song
    audioPlayer.src = audioSrc;
    audioPlayer.play();
    document.getElementById('currentSongTitle').textContent = `Current Song: ${songTitle}`;
}

// Add click event listener to all music item images
const musicItems = document.querySelectorAll('.music-item img');
musicItems.forEach(item => {
    item.addEventListener('click', handleImageClick);
});
