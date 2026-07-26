const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const currentTimeDisplay =
    document.getElementById("currentTime");

const durationDisplay =
    document.getElementById("duration");

const playlistElement =
    document.getElementById("playlist");

const cover = document.querySelector('.cover');


// ======================================
// YOUR RADIO PLAYLIST
// ======================================

const playlist = [

    {
        title: "Bloodstream",
        artist: "Alyssa Grace",
        file: "audio/alyssa_grace_bloodstream_lyrics_mp3_72811.mp3"
    },

    {
        title: "Heather",
        artist: "Conan Gray",
        file: "audio/conangray_heather_lyrics_mp3_70676.mp3"
    },

    {
        title: "Here with me",
        artist: "D4vd",
        file: "audio/d4vd_here_with_me_lyrics_mp3_61074.mp3"
    },

    {
        title: "Willing and Able",
        artist: "Noah Kahan",
        file: "audio/noah_kahan_willing_and_able_official_lyric_video_mp3_72729.mp3"
    }

];


// Current song
let currentSong = 0;


// ======================================
// LOAD SONG
// ======================================

function loadSong(index) {

    currentSong = index;

    const song = playlist[currentSong];

    audio.src = song.file;

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    updatePlaylist();

}


// ======================================
// PLAY
// ======================================

function playSong() {

    audio.play();

    playButton.textContent = "❚❚";

}


// ======================================
// PAUSE
// ======================================

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


// ======================================
// PLAY / PAUSE
// ======================================

playButton.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ======================================
// NEXT
// ======================================

nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= playlist.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// PREVIOUS
// ======================================

previousButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = playlist.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// AUTOMATICALLY PLAY NEXT SONG
// ======================================

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= playlist.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ======================================
// PROGRESS BAR
// ======================================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    progress.max = audio.duration;

    progress.value = audio.currentTime;

    currentTimeDisplay.textContent =
        formatTime(audio.currentTime);

    durationDisplay.textContent =
        formatTime(audio.duration);

});


progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});


// ======================================
// VOLUME
// ======================================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// ======================================
// FORMAT TIME
// ======================================

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}


// ======================================
// DISPLAY PLAYLIST
// ======================================

function updatePlaylist() {

    playlistElement.innerHTML = "";

    playlist.forEach((song, index) => {

        const element =
            document.createElement("div");

        element.classList.add("song");

        element.textContent =
            `${song.title} — ${song.artist}`;

        if (index === currentSong) {

            element.classList.add("active");

        }

        element.addEventListener("click", () => {

            loadSong(index);

            playSong();

        });

        playlistElement.appendChild(element);

    });

}


// ======================================
// INITIALIZE RADIO
// ======================================

audio.volume = 0.7;

loadSong(0);