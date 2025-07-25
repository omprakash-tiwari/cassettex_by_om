console.log("Let's write javascript");

let currentSong = new Audio();
let songs;
let currFolder;
let temp;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let p1 = element.href.split(`/${folder}/`)[1]
            let p2 = p1.replaceAll("%20", " ")
            songs.push(p2)
        }
    }

    // Show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <div class="info flex">
                                <div><img class="invert" width="34" src="images/music.svg" alt=""></div>
                                <div class="songname flex items-center justify-center"><div> ${song}</div>
                                </div>
                            </div>
                            <div class="playnow flex">
                                <img class="invert" src="images/play.svg" alt="">
                            </div> </li>`;
    }

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
            })
            e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/pause.svg"
            playMusic(e.querySelector(".info").children[1].children[0].innerHTML.trim())
        })
    })

    // Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {

    //     if (e.querySelector(".playnow").getElementsByTagName("img")[0].src == "images/pause.svg") {
    //         //Add an event listener to play of songlist
    //         e.querySelector(".playnow").getElementsByTagName("img")[0].addEventListener("click", () => {
    //             currentSong.pause()
    //             play.src = "images/play.svg"
    //             Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    //                 if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
    //                     e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
    //                 }
    //             })
    //         })

    //     }
    // })

    return songs
}

const playMusic = (track, pause = false) => {
    // if (currentSong.paused) {
    //     currentSong.src = `/${currFolder}/` + track
    //     console.log(currentSong)
    //     if (!pause && temp == currentSong.src) {
    //         temp.play()
    //         play.src = "images/pause.svg"
    //         Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    //             if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
    //                 e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/pause.svg"
    //             }
    //         })
    //     }
    //     else if (!pause && temp != currentSong.src) {
    //         temp=currentSong.src
    //         currentSong.play()
    //         play.src = "images/pause.svg"
    //         Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    //             if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
    //                 e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/pause.svg"
    //             }
    //         })
    //     }
    // }
    // else {
    //     temp = currentSong.src
    //     currentSong.pause()
    //     play.src = "images/play.svg"
    //     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    //         if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
    //             e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
    //         }
    //     })
    // }

    if (currentSong.paused) {
        currentSong.src = `/${currFolder}/` + track
        if (!pause) {
            temp = currentSong.src
            currentSong.play()
            play.src = "images/pause.svg"
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
                    e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/pause.svg"
                }
            })
        }
    }
    else {
        currentSong.src = `/${currFolder}/` + track
        if (temp == currentSong.src) {
            currentSong.pause()
            play.src = "images/play.svg"
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
                    e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
                }
            })
        }
        else {
            temp = currentSong.src
            currentSong.play()
            play.src = "images/pause.svg"
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
                    e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/pause.svg"
                }
            })
        }
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    console.log("displaying albums")
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json();
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card flex">
            <div><img src="/songs/${folder}/cover.jpg" alt="">
                <button><img src="images/playButton.svg" alt=""></button>
            </div>
            <div>${response.title}</div>
            <div>${response.description}</div>
        </div>`
        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("Fetching Songs")
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            // playMusic(songs[0], true)
            if (currentSong.paused) {
                play.src = "images/play.svg"
            }
            document.querySelector(".left").style.left = "0"
        })
    })
}

async function main() {
    await getSongs("songs/romantic")
    playMusic(songs[0], true)
    await displayAlbums()

    // Add an event listener to play
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "images/pause.svg"
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
                    e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/pause.svg"
                }
            })
        }
        else {
            currentSong.pause()
            play.src = "images/play.svg"
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                if (e.children[0].children[1].children[0].innerHTML.includes(`${currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " ")}`)) {
                    e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
                }
            })
        }
    })
    // Add an event listener when song ends
    currentSong.addEventListener("ended", () => {
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
        })
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " "))
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
        else {
            playMusic(songs[0])
        }
    })

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentSong.pause()
        play.src = "images/play.svg"
        console.log("Previous clicked")
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
        })
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " "))
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
        else {
            playMusic(songs[songs.length - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        play.src = "images/play.svg"
        console.log("Next clicked")
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.querySelector(".playnow").getElementsByTagName("img")[0].src = "images/play.svg"
        })
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0].replaceAll("%20", " "))
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
        else {
            playMusic(songs[0])
        }
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume == 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("images/volume.svg", "images/mute.svg")
        }
        else {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("images/mute.svg", "images/volume.svg")
        }
    })

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    })
}

main()