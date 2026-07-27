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

const channelButtons = document.querySelectorAll(".channel");

// ============================================
// MUSIC
// ============================================

const songs = [

    {
        title: "Bloodstream",
        artist: "Alyssa Grace",
        audio: "audio/alyssa_grace_bloodstream_lyrics_mp3_72811.mp3",
        cover: "covers/bloodstream.jpeg"
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
        audio: "audio/K. - Cigarettes After Sex - Cigarettes After Sex.mp3",
        cover: "covers/K.jpeg"
    },

    {
        title: "Cardigan",
        artist: "Taylor Swift",
        audio: "audio/taylor_swift_cardigan_official_music_video_mp3_5084.mp3",
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
// PODCASTS
// ============================================

const podcasts = [

    {
        title: "SpiderRadio Episode 1",
        artist: "Danika Hart",
        audio: "podcasts/All Danika Hart Podcasts  Spider-Man 2  4k 60fps - KyleVX.mp3",
        cover: "covers/Danika_Hart.webp"
    },

    {
        title: "Podcast Episode 2",
        artist: "Your Name",
        audio: "",
        cover: "covers/Danika_Hart.webp"
    },

    {
        title: "Podcast Episode 3",
        artist: "Your Name",
        audio: "",
        cover: "covers/Danika_Hart.webp"
    }

];

// ============================================
// RADIO STATE
// ============================================

let currentChannel = "music";
let currentSong = 0;
let currentPodcastIndex = 0;
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

function updateChannelButtons() {

    channelButtons.forEach((button) => {

        const isActive = button.dataset.channel === currentChannel;

        button.classList.toggle("active", isActive);

    });

}

function getActiveItems() {

    return currentChannel === "podcast"
        ? podcasts
        : songs;

}

// ============================================
// LOAD SONG
// ============================================

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.pause();
    audio.currentTime = 0;
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

    const song = songs[currentSong];

    audio.src = encodeAudioPath(song.audio);

    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    cover.style.backgroundImage =
        `url("${song.cover}")`;

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

    songTitle.textContent = "Danika Hart";
    songArtist.textContent = "Revolution of New York";

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
// LOAD PODCAST
// ============================================

function loadPodcast(index) {

    currentPodcastIndex = index;

    const podcast = podcasts[currentPodcastIndex];

    audio.pause();
    audio.currentTime = 0;
    audio.src = podcast.audio ? encodeAudioPath(podcast.audio) : "";

    songTitle.textContent = podcast.title;
    songArtist.textContent = podcast.artist;

    cover.style.backgroundImage =
        `url("${podcast.cover}")`;

    updatePlaylist();
}

// ============================================
// PLAY PODCAST
// ============================================

function playPodcast() {

    const podcast = podcasts[currentPodcastIndex];

    if (!podcast.audio) {

        playButton.textContent = "▶";
        return;

    }

    audio.src = encodeAudioPath(podcast.audio);

    audio.play()
        .then(() => {

            playButton.textContent = "❚❚";

        })
        .catch(error => {

            console.error(
                "Could not play podcast:",
                error
            );

        });

}

// ============================================
// SWITCH CHANNEL
// ============================================

function switchChannel(channelName) {

    currentChannel = channelName;

    if (channelName === "podcast") {

        currentPodcastIndex = 0;
        loadPodcast(0);
        audio.pause();
        playButton.textContent = "▶";
        radioStarted = false;

    } else {

        songsPlayed = 0;
        currentSong = 0;
        loadSong(0);
        radioStarted = false;
        playButton.textContent = "▶";

    }

    updateChannelButtons();

}

// ============================================
// START RADIO
// ============================================

function startRadio() {

    if (currentChannel === "podcast") {

        radioStarted = true;
        playPodcast();
        return;

    }

    if (radioStarted) {

        playSong();
        return;

    }

    radioStarted = true;
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

    if (currentChannel === "podcast") {

        playNextPodcast();
        return;

    }

    if (playingPresenter) {

        playingPresenter = false;

        loadSong(currentSong);
        playSong();
        return;

    }

    songsPlayed++;

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
// NEXT PODCAST
// ============================================

function playNextPodcast() {

    currentPodcastIndex++;

    if (currentPodcastIndex >= podcasts.length) {

        currentPodcastIndex = 0;

    }

    loadPodcast(currentPodcastIndex);
    playPodcast();

}

// ============================================
// NEXT BUTTON
// ============================================

nextButton.addEventListener("click", () => {

    if (currentChannel === "podcast") {

        playNextPodcast();

    } else {

        playNextSong();

    }

});

// ============================================
// PREVIOUS BUTTON
// ============================================

previousButton.addEventListener("click", () => {

    if (currentChannel === "podcast") {

        currentPodcastIndex--;

        if (currentPodcastIndex < 0) {

            currentPodcastIndex = podcasts.length - 1;

        }

        loadPodcast(currentPodcastIndex);
        playPodcast();

    } else {

        currentSong--;

        if (currentSong < 0) {

            currentSong = songs.length - 1;

        }

        loadSong(currentSong);
        playSong();

    }

});

// ============================================
// CHANNEL BUTTONS
// ============================================

channelButtons.forEach((button) => {

    button.addEventListener("click", () => {

        switchChannel(button.dataset.channel);

    });

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

    const items = getActiveItems();

    items.forEach((item, index) => {

        const element =
            document.createElement("div");

        element.classList.add("song");

        element.textContent =
            `${item.title} — ${item.artist}`;

        if (currentChannel === "music") {

            if (index === currentSong) {

                element.classList.add("active");

            }

        } else if (index === currentPodcastIndex) {

            element.classList.add("active");

        }

        element.addEventListener("click", () => {

            if (currentChannel === "podcast") {

                currentPodcastIndex = index;
                loadPodcast(currentPodcastIndex);

                if (radioStarted) {

                    playPodcast();

                }

            } else {

                currentSong = index;
                loadSong(currentSong);

                if (radioStarted) {

                    playSong();

                }

            }

        });

        playlistElement.appendChild(element);

    });

}

// ============================================
// INITIALIZE
// ============================================

audio.volume = 0.9;
updateChannelButtons();
loadSong(0);