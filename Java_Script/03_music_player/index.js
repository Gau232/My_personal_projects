/* sections
// golbal - start 
// selectors
// variables:-
// funtions:-
// golbal - end
// 1. Playlist open close - start
// 1. Playlist open close - end
// 2. bringing songs to cards / songArray creation- start
// top tracks
        // songArray creation
        // to HTML 
// 2. bringing songs to cards / songArray creation - end
// 3. selecting the song - start
    //3.1 getting song details
    //3.2 updating player left section
// 3. selecting the song - end
// 4. playing the selected song - start
// 4. playing the selected song - end
*/

// golbal - start 
// selectors
const navBar = document.querySelector('.nav');
const midBody = document.querySelector('.mid_section');
const playListSection = document.querySelector('#inactive_section');
const playList = document.querySelector('#playlist');  // getElementById not working̥̥
const playerAlbumCover = document.querySelector('#album_cover');
const playerSongName = document.querySelector('#song_name');
const playerSubTitle = document.querySelector('#sub_title');
const playButton = document.querySelector('#play_button');
const currTime = document.querySelector('#currentTime');
const endTime = document.querySelector('#endTime');
const seekBar = document.querySelector('#seek_bar');
const seekBar2 = document.querySelector('#bar2');
const seekBarDot = document.querySelector('#dot');
const volIcon = document.querySelector('.vol_icon');
const volBar = document.querySelector('#vol_bar');
const volBar2 = document.querySelector('#vol_bar2');
const volBarDot = document.querySelector('#vol_dot');
const playlistSection = document.querySelector('#plOderedList');
const playListButton = document.querySelector('#addToPlaylist');



const taylorPlayList = document.querySelector(".taylor");
const rihannaPlayList = document.querySelector(".rihanna");
const ladyGagaPlayList = document.querySelector(".lady_gaga");
const oneRepublicPlayList = document.querySelector(".one_republic");
const adelePlayList = document.querySelector(".adele");

// variables:-
const baseUrl= "https://api.napster.com/v2.2";
const callApiKey = "apikey=YWNkZDJkZjktN2Y0ZS00MTExLWI2MzAtNmE4ZDZlODI3MWRk";

let songsArray = [];

// funtions:-
function fetchLink(midLink) {
    return baseUrl + midLink + callApiKey;
}

// golbal - end


// 1. Playlist open close - start
function openPlayList() {
    navBar.classList.add("playlist_blur_bg");
    midBody.classList.add("playlist_blur_bg");
    playListSection.style.display='initial';
    playList.classList.remove("playlist_animation_close");
    playList.classList.add("playlist_animation_open");
}

function backToMain() {
    navBar.classList.remove("playlist_blur_bg");
    midBody.classList.remove("playlist_blur_bg");
    playListSection.style.display='none';
    playList.classList.add("playlist_animation_close");
    playList.classList.remove("playlist_animation_open");
}
// 1. Playlist open close - end


// 2. bringing songs to cards / songArray creation- start

// top tracks
async function getTopTrackItems(artist, artId) {
    // /artists/Art.28463069/tracks/top?limit=10&
    const topTrackAPI = await fetch(fetchLink("/artists/"+artId+"/tracks/top?limit=8&"));
    const topTrackItems = await topTrackAPI.json();
    let arrList = topTrackItems.tracks;
    // console.log(arrList);

    let newElement = "";
    arrList.forEach(element => {
        let uniqueTrackId = element.id;
        let songName = element.name;
        let artName = element.artistName;
        let audioURL = element.previewURL;
        let albumId = element.albumId;
        let albumImg = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`
        // console.log(songName +" , "+ audioURL +" , "+ trackId + " , "+ albumId+" , "+albumImg);


        // songArray creation
        songsArray.push({
            id: uniqueTrackId,
            songName: songName,
            artistName: artName,
            audioURL: audioURL,
            albumImg: albumImg
        });

        // to HTML 
        newElement = (`${newElement}<li class="card" onclick="getId(this)" id="${uniqueTrackId}">
        <!-- <a href="./img/ac3.jpg" class="card_image_link"> -->
        <!-- <audio src="./music/test_music.mp3" id="audio"> -->
          <img
            class="card_image"
            src="${albumImg}" onerror="this.src='./img/ac3.jpg';this.onerror='';" 
            alt="album cover pic"
          />
        <!-- </a> -->
        <div class="card_title">${songName}</div>
      </li>`);
    });
    // return newElement;
    artist.innerHTML = newElement;
    
}

getTopTrackItems(taylorPlayList,'art.10482910');
getTopTrackItems(ladyGagaPlayList,'art.20067373');
getTopTrackItems(oneRepublicPlayList,'art.9557788');
getTopTrackItems(rihannaPlayList,'art.7375005');
getTopTrackItems(adelePlayList,'art.20554979');

console.log(songsArray);
// 2. bringing songs to cards / songArray creation - end

// 3. selecting the song - start
let currSongId = "";
let currSong = "./music/test_music.mp3";
let currSongIndex = null;
let music = new Audio();
music.src = currSong;

function getId(e) {
    play_pause();
    currSongId = e.id;
    //3.1 getting song details
    let selectedSongObj = songsArray.find(item => item.id === currSongId);
    console.log("The song is :");
    console.log(selectedSongObj);
    console.log(`Song Index is: ${songsArray.indexOf(selectedSongObj)}`);


    //3.2 updating player left section
    playerAlbumCover.src = selectedSongObj.albumImg;
    playerSongName.innerText = selectedSongObj.songName;
    playerSubTitle.innerText = selectedSongObj.artistName;

    //3.3 updating the music variables
    // music.pause();
    currSongIndex = songsArray.indexOf(selectedSongObj);
    currSong = selectedSongObj.audioURL;
    music.src = currSong;
    //3.4 playing the song
    play_pause();
    playListIconUpdate();
}
// 3. selecting the song - end

// 4. player controls - start
// 4.1 playing the selected song 
function play_pause() {
    if (music.paused) {
        music.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
        playerAlbumCover.classList.add('rotate');
        playerAlbumCover.style.height='180%';
    }
    else {
        music.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        playerAlbumCover.classList.remove('rotate');
        playerAlbumCover.style.height='100%';
    }
}

// 4.2 updating the time
// music.addEventListener('timeupdate', () => {})
music.ontimeupdate = function updateTime(){
    let music_curr = music.currentTime;
    let music_dur = music.duration;


    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    sec1 = (sec1<10)? `0${sec1}` : sec1;
    currTime.innerHTML = `${min1}:${sec1}`;

    let min2 = Math.floor(music_dur / 60);
    let sec2 = Math.floor(music_dur % 60);
    sec2 = (sec2<10)? `0${sec2}` : sec2;
    endTime.innerHTML = `${min2}:${sec2}`;

    let progressBar = Math.round((music_curr/music_dur)*100);

    seekBar.value = progressBar;
    seekBar2.style.width = `${progressBar}%`;
    seekBarDot.style.left = `${progressBar}%`;
    // console.log(music.currentTime);
}

// 4.3 seek control
seekBar.addEventListener('change',() => {
    music.currentTime = seekBar.value * music.duration/100;
})

// 4.4 if music ended
music.addEventListener('ended', () => {
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
    playerAlbumCover.classList.remove('rotate');
    playerAlbumCover.style.height='100%';
});

// 4.5 volume controls
volIcon.addEventListener('click', () => {
    if (music.volume >0 ) {
        music.volume = 0;
        volIcon.classList.remove('fa-volume-high');
        volIcon.classList.add('fa-volume-xmark');
        volBar2.style.width = 0;
        volBarDot.style.left = 0;

    }
    else {
        music.volume = 1;
        volIcon.classList.add('fa-volume-high');
        volIcon.classList.remove('fa-volume-xmark');
        volBar2.style.width = '100%';
        volBarDot.style.left = '100%';
    }
})

volBar.addEventListener('change', () => {
    music.volume = volBar.value/100;
    volBar2.style.width = `${volBar.value}%`
    volBarDot.style.left = `${volBar.value}%`
})

// 4.6 next, previous, forward, backward buttons
function playPrevSong(){
    currSongIndex = (currSongIndex === 0) ? songsArray.length : currSongIndex;
    getId(songsArray[currSongIndex - 1]);
    playListIconUpdate();
};
function playNextSong(){
    currSongIndex = (currSongIndex === (songsArray.length-1)) ? -1 : currSongIndex;
    getId(songsArray[currSongIndex + 1]);
    playListIconUpdate();
};
function tsecsback(){
    music.currentTime -= 5;
};
function tsecsforward(){
    music.currentTime += 5;
};

// 4.7 shuffle button
function shuffle() {
    currSongIndex = Math.round(Math.random()*40);
    getId(songsArray[currSongIndex]);
    playListIconUpdate();
}
// 4. player controls - end

// 5. Playlist - start
// 5.1 Add to playlist
function add_remove_playlist() {
    if(localStorage.getItem(currSongId) === null) {
        localStorage.setItem(currSongId,JSON.stringify(songsArray[currSongIndex]));
    }
    else {
        localStorage.removeItem(currSongId);
    }
    generatePlayList();
    playListIconUpdate();
}

// 5.2 Generate Playlists
function generatePlayList() {
    let newPlElement = "";
    for (let i=0; i<localStorage.length; i++ ) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        newPlElement += (`<li class="pl_items" onclick="playListItem(this)" >
        <img id="pl_album_image" src="${value.albumImg}" alt="album image" />
        <h5>
          ${value.songName}
          <div>${value.artistName}</div>
        </h5>
        <div class="pl_icon_container">
          <i class="fa-solid fa-circle-xmark pl_icons" onclick="removeFromPlaylist(this)" data-songid="${value.id}"></i>
        </div>
      </li>`);
    }
    playlistSection.innerHTML = newPlElement;
}
generatePlayList();

// 5.3 Playlist icon update
function playListIconUpdate() {
    if(localStorage.getItem(currSongId) === null) {
        playListButton.classList.remove("fa-solid");
        playListButton.classList.add("fa-regular");
        playListButton.style.color = "white";
    }
    else {
        playListButton.classList.add("fa-solid");
        playListButton.classList.remove("fa-regular");
        playListButton.style.color = "red";
    }
}

// 5.4 playlist selections play
function playListItem(e) {
    // let songurl = e.getAttribute("data-songurl");
    // console.log(songurl);
    // music.src = songurl;
    // play_pause();
}

// 5.5 remove from playlist
function removeFromPlaylist(e) {
    let remId = e.getAttribute("data-songid");
    localStorage.removeItem(remId);
    generatePlayList();
}

// 5. Playlist - end

