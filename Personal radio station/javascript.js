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

const cover =
    document.querySelector(".cover");


// ============================================
// SONGS
// ============================================

const songs = [

    {
        title: "Bloodstream",
        artist: "Alyssa Grace",
        audio: "audio/alyssa_grace_bloodstream_lyrics_mp3_72811.mp3",
        cover:"covers/bloodstream.jpeg"
    },

    {
        title: "Heather",
        artist: "Conan Gray",
        audio: "audio/conangray_heather_lyrics_mp3_70676.mp3",
        cover: "covers/Heather.jpeg"
    },

    {
        title: "Here with me",
        artist: "D4vd",
        audio: "audio/d4vd_here_with_me_lyrics_mp3_61074.mp3",
        cover: "covers/HereWithMe.jpeg"
    },

    {
        title: "Willing and Able",
        artist: "Noah Kahan",
        audio: "audio/noah_kahan_willing_and_able_official_lyric_video_mp3_72729.mp3",
        cover: "covers/WillingAndAble.jpeg"
    },

    {
        title: "K.",
        artist: "Cigarettes After Sex",
        audio:"audio/K. - Cigarettes After Sex - Cigarettes After Sex.mp3",
        cover: "covers/K.jpeg"
    },

    {
        title:"Cardigan",
        artist:"Taylor Swift",
        audio:"audio/taylor_swift_cardigan_official_music_video_mp3_5084.mp3",
        cover: "covers/Cardigan.jpeg"
    }

];


// ============================================
// PRESENTER AUDIO
// ============================================

const presenterAudio = [

    "presenter/Spider-Man (Hot Take) Danika Hart Postcast Is Fun Listening to🤔  #shorts #marvelstudios #spiderman2 - Raq9ine (1).mp3",
    "presenter/Danika Hart Still Crushing On Spider-Man (Miles)  Marvel’s Spider-Man 2 - Sakai Hoplite Vanguard (Sakai Clips).mp3",
    "presenter/Spider Man Miles Morales PS5 Gameplay - Jameson Loses Debate With Danika About Spider Man - calloftreyarch.mp3",
    "presenter/Marvel's Spider-Man 2 Danikast Episode 6 Danika Hart Has Questions About New Black Suit Spider-Man - MirageOfShellz.mp3"

];


// ============================================
// RADIO STATE
// ============================================

let currentSong = 0;

let songsPlayed = 0;

let playingPresenter = false;

let radioStarted = false;

let presenterIndex = 0;


// ============================================
// HELPERS
// ============================================

function encodeAudioPath(path) {

    return path
        .split("/")
        .map(segment => encodeURIComponent(segment))
        .join("/");

}


// ============================================
// LOAD SONG
// ============================================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.src = encodeAudioPath(song.audio);

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    cover.style.backgroundImage =
        `url("${song.cover}")`;

    updatePlaylist();
}


// ============================================
// PLAY SONG
// ============================================

function playSong() {

    playingPresenter = false;

    audio.src = encodeAudioPath(songs[currentSong].audio);

    songTitle.textContent =
        songs[currentSong].title;

    songArtist.textContent =
        songs[currentSong].artist;

    cover.style.backgroundImage =
        `url("${songs[currentSong].cover}")`;

    audio.play()
        .then(() => {

            playButton.textContent = "❚❚";

        })
        .catch(error => {

            console.error(
                "Could not play song:",
                error
            );

        });

}


// ============================================
// PLAY PRESENTER
// ============================================

function playPresenter() {

    if (presenterIndex >= presenterAudio.length) {

        presenterIndex = 0;

    }

    playingPresenter = true;

    audio.src = encodeAudioPath(
        presenterAudio[presenterIndex]
    );

    songTitle.textContent =
        "Danika Hart";

    songArtist.textContent =
        "Revolution of New York";

    cover.style.backgroundImage =
        "url('covers/Danika_Hart.webp')";

    audio.play()
        .then(() => {

            playButton.textContent = "❚❚";

        })
        .catch(error => {

            console.error(
                "Could not play presenter:",
                error
            );

        });

    presenterIndex++;

}


// ============================================
// START RADIO
// ============================================

function startRadio() {

    if (radioStarted) {

        playSong();

        return;

    }

    radioStarted = true;

    // First thing the listener hears
    // is the presenter intro.

    presenterIndex = 0;

    playPresenter();

}


// ============================================
// PLAY / PAUSE
// ============================================

playButton.addEventListener("click", () => {

    if (audio.paused) {

        if (!radioStarted) {

            startRadio();

        } else {

            audio.play()
                .then(() => {

                    playButton.textContent = "❚❚";

                });

        }

    } else {

        audio.pause();

        playButton.textContent = "▶";

    }

});


// ============================================
// AUDIO FINISHED
// ============================================

audio.addEventListener("ended", () => {

    // ========================================
    // PRESENTER FINISHED
    // ========================================

    if (playingPresenter) {

        playingPresenter = false;

        loadSong(currentSong);

        playSong();

        return;

    }


    // ========================================
    // SONG FINISHED
    // ========================================

    songsPlayed++;


    // After every TWO songs
    // play presenter interruption.

    if (songsPlayed % 2 === 0) {

        playPresenter();

    } else {

        playNextSong();

    }

});


// ============================================
// NEXT SONG
// ============================================

function playNextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

}


// ============================================
// NEXT BUTTON
// ============================================

nextButton.addEventListener("click", () => {

    playNextSong();

});


// ============================================
// PREVIOUS BUTTON
// ============================================

previousButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ============================================
// PROGRESS
// ============================================

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


// ============================================
// VOLUME
// ============================================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// ============================================
// FORMAT TIME
// ============================================

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}


// ============================================
// PLAYLIST DISPLAY
// ============================================

function updatePlaylist() {

    playlistElement.innerHTML = "";

    songs.forEach((song, index) => {

        const element =
            document.createElement("div");

        element.classList.add("song");

        element.textContent =
            `${song.title} — ${song.artist}`;

        if (index === currentSong) {

            element.classList.add("active");

        }

        element.addEventListener("click", () => {

            currentSong = index;

            loadSong(currentSong);

            playSong();

        });

        playlistElement.appendChild(element);

    });

}


// ============================================
// INITIALIZE
// ============================================

audio.volume = 0.9;

loadSong(0);