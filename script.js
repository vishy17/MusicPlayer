let songs = [
    {
        name: "music1",
        image: "image1",
        title: "Fade",
        artist: "Alan Walker",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music2",
        image: "image2",
        title: "Faded",
        artist: "Alan Walker",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music3",
        image: "image3",
        title: "Alone",
        artist: "Alan Walker",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music4",
        image: "image4",
        title: "The Spectre",
        artist: "Alan Walker",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music5",
        image: "image5",
        title: "Love Me Like You Do",
        artist: "Ellie Goulding",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music6",
        image: "image6",
        title: "Gal Sun",
        artist: "Jass Manak",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music7",
        image: "image7",
        title: "High Rated Gabru",
        artist: "Guru Randhawa",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music8",
        image: "image8",
        title: "lehanga",
        artist: "Jass Manak",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music9",
        image: "image9",
        title: "Life",
        artist: "Akhil",
        playlist: "false",
        liked: "false"
    },
    {
        name: "music10",
        image: "image10",
        title: "Nira Ishq",
        artist: "Guri",
        playlist: "false",
        liked: "false"
    },
]

let playlist = $(".playlist");
playlist.click(function (e) {
    let playlistModal = `<div class="add-to-playlist-modal">
                        <div class="material-icons cross-modal">close</div>
                        <div class="all-title">
                            <div class="title all-properties">Title</div>
                            <div class="artist all-properties">Artist</div>
                            <div class="remove all-properties">Remove</div>
                        </div>
                        <div class="all-content"></div>
                    </div>`

    $(".container").append(playlistModal);

    

    loadPlaylist();
    $(".cross-modal").click(function (e) {
        $(".add-to-playlist-modal").remove();
    })
})



function loadPlaylist() {
    let allContent = $(".all-content");
    for (let i = 0; i < songs.length; i++) {
        if(songs[i].playlist == "true") {
            let favSongs = $(`<div class="parent-modal-div">
                            <div class="title-name">${songs[i].title}</div>
                            <div class="artistname">${songs[i].artist}</div>
                            <div class="removeSong class-${i} material-icons">remove_circle_outline</div>
                        </div>`)
            

            allContent.append(favSongs);
           
        }
    }
    let allModal = document.querySelectorAll(".removeSong");
    for(let i = 0; i < allModal.length; i++) {
        if(allModal.length > 0) {
            allModal[i].addEventListener("click", function(e) {
                allModal[i].classList.add("temp");

                let index = allModal[i].className.split(" ")[1].split("-")[1];
                UIupdate(index);
            })
        }
    }
    
}

function UIupdate(i) {
    $(".temp").parent().remove();
    songs[i].playlist = "false";
    loadPlaylistOnMainUI(index);
    
}

function loadPlayListUi(i) {
    for(let j = 0; j < songs.length; j++) {
        if(songs[i].playlist == "true") {
            $(".add-to-playlist").text("playlist_add_check");
        }else {
            $(".add-to-playlist").text("playlist_add");
        }
    }
}

function loadPlaylistOnMainUI(index) {
    if(songs[index].playlist == "true") {
        $(".add-to-playlist").text("playlist_add_check");
    }else {
        $(".add-to-playlist").text("playlist_add");
    }
}

$(".add-to-playlist").click(function (e) {
    if (songs[index].playlist == "true") {
        songs[index].playlist = "false;"
    } else {
        songs[index].playlist = "true";
    }
    loadPlaylistOnMainUI(index);
})

// $(".add-to-playlist").click(function (e) {
//     if ($(this).text() == "playlist_add") {
//         $(this).text("playlist_add_check");
//     }
//     else {
//         $(this).text("playlist_add");
//     }
// })


let music = $("audio");
$(".play-stop").click(function (e) {
    if ($(this).text() == "play_circle_outline") {
        $(this).text("pause");
        music[0].play();
        $(".container").css("background-image", "/image/image1.jpg")
    }
    else {
        $(this).text("play_circle_outline");
        music[0].pause();
    }
})

let volumeBarClicked = true;
function openVolumeBar() {
    volumeBarClicked = false;
    volumeBar = $(`<input class = "range-sound" type="range" min="0" max="100" value="100" ></input>`);

    $(".container").append(volumeBar);

    // volumeBar.animate({
    //     "height": "13vh"
    // }, 100);

}

function closeVolumeBar() {
    volumeBarClicked = true;
    let volumeBar = $("input");
    // volumeBar.animate({
    //     "height": "0vh"
    // }, 300)

    volumeBar.remove();

    // setTimeout(() => {
    //     volumeBar.remove();
    // }, 299);

}

document.querySelector(".sound").addEventListener("click", function(e) {
    volumeBarClicked ? openVolumeBar() : closeVolumeBar();
    if(!volumeBarClicked) {
        document.querySelector(".range-sound").addEventListener("change", function(e) {
            console.log(e.currentTarget.value);
            music2.volume = e.currentTarget.value / 100;

            if(e.currentTarget.value == 0) {
                $(".sound").text("volume_off");
            }
            else{
                $(".sound").text("volume_up")
            }
        })
    }
})




let index = 0;

$(".forward").click(function (e) {
    index = (index + 1) % 10;
    songs[index]
    if ($(".play-stop").text() == "pause") {
        loadSong(songs[index].name, index);
    }
    loadLikes(index);
    loadPlaylistOnMainUI(index);
})

$(".backward").click(function (e) {
    if (index == 0) {
        index = 9;
    } else {
        index = index - 1;
    }
    if ($(".play-stop").text() == "pause") {
        loadSong(songs[index].name, index);

    }
    loadLikes(index);
    loadPlaylistOnMainUI(index);
    
})

$(".favorite").click(function (e) {
    if (songs[index].liked == "true") {
        songs[index]["liked"] = "false";
    } else {
        songs[index]["liked"] = "true";
    }
    loadLikes(index);
})


function loadLikes(index) {
    if (songs[index].liked == "true") {
        $('.favorite').css("color", "red");
    }
    else {
        $('.favorite').css("color", "white");
    }
}
function loadSong(name, index) {
    if (name == undefined) {
        music[0].pause();
    }
    else {
        let url = "/image/" + songs[index].image + ".jpg";
        $(".container").css("background-image", `url(${url})`);
        $(".title2").text(songs[index].title);
        $(".name").text(songs[index].artist);

        music[0].src = `/music/${name}.mp3.mp3`
        music[0].play();
    }

}



let progress = $(".progress");

let actualTime = $(".actual-time");
let totalTime = $(".total-time");



document.querySelector("audio").addEventListener('timeupdate', function (e) {
    let { currentTime, duration } = e.srcElement;

    let progressTime = (currentTime / duration) * 100;

    progress.css("width", progressTime + "%");

    let totalTimeMin = Math.floor(duration / 60);
    let totalTimeSec = Math.floor(duration % 60);

    if (totalTimeSec < 10) {
        totalTimeSec = "0" + totalTimeSec;
    }
    let totalTimeDuration = totalTimeMin + ":" + totalTimeSec;
    if (duration) {
        totalTime.text(totalTimeDuration);
    }

    let currentTimeMin = Math.floor(currentTime / 60);
    let currentTimeSec = Math.floor(currentTime % 60);

    if (currentTimeSec < 10) {
        currentTimeSec = "0" + currentTimeSec;
    }
    let currentTimeDuration = currentTimeMin + ":" + currentTimeSec;
    actualTime.text(currentTimeDuration);

})

document.querySelector("audio").addEventListener("ended", function () {
    index = (index + 1) % 10;
    loadSong(songs[index].name, index);
});

let timer = document.querySelector(".timer");

let music2 = document.querySelector("audio")
timer.addEventListener("click", function (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music2.duration;


    music2.currentTime = (clickX / width) * duration;
})

// progressContainer.addEventListener("click", function (e) {
//     const width = this.clientWidth;
//     const clickX = e.offsetX;
//     const duration = audio.duration;

//     audioEle.currentTime = (clickX / width) * duration;
// })


let isMusicModalOpen = false;
$(".music").click(function (e) {
    if (!isMusicModalOpen) {
        isMusicModalOpen = true;
        let musicModal = $(`<div class="music-modal">
                        <div class="material-icons icon-cross">close</div>
                        <div class="music-modal-parent-div">
                        </div>
                    </div>`)

        $(".container").append(musicModal);

        let diffrentSongsModal = $(".music-modal-parent-div");

        for (let i = 0; i < songs.length; i++) {
            let photo = "/image/" + songs[i]["image"] + ".jpg";
            console.log(photo);
            let allSongs = $(`<div class="main-work-music-modal">
                        <div class="show-image" style= "background-image: url(${photo});"></div>
                        <div class="amn">
                            <div class="song-name">${songs[i]["title"]}</div>
                            <div class="artist-name">${songs[i]["artist"]}</div>
                        </div>
                        <div class="material-icons play-icon">play_circle_outline</div>
                    </div>`)


            diffrentSongsModal.append(allSongs);


        }

        function removeAllPlayedClass(index) {
            let playedBtn = document.querySelectorAll(".play-icon");

            for (let i = 0; i < playedBtn.length; i++) {
                if (i != index) {
                    playedBtn[i].textContent = "play_circle_outline";
                }
            }
        }

        let allPlay = document.querySelectorAll(".play-icon")
        for (let i = 0; i < songs.length; i++) {
            allPlay[i].addEventListener("click", function (e) {
                if (e.currentTarget.textContent == "play_circle_outline") {
                    removeAllPlayedClass(i);
                    document.querySelector(".play-stop").textContent = "pause";
                    allPlay[i].textContent = "pause";

                    // setProperty(i);

                    loadSong(songs[i].name, i);
                }
                else {
                    allPlay[i].classList.remove("played");
                    document.querySelector(".play-stop").textContent = "play_circle_outline";
                    e.currentTarget.textContent = "play_circle_outline";
                    loadSong(undefined, i);
                }
            })
        }

    }

    $(".icon-cross").click(function () {
        $(".music-modal").remove();
        isMusicModalOpen = false;
    })
})




