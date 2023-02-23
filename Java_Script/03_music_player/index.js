/* sections
// golbal - start 
// selectors
// variables
// funtions
// golbal - end
// 1. Playlist open close on UI - start
// 1. Playlist open close on UI - end
// 2. bringing songs to cards / songArray creation- start
// top artists
        // create elements
// top albums
        // create elements
// top and new tracks general
        // create songArray
        // create elements
        // create songArray
        // create elements
// tracks for artist/album
    // console.log(trackArray);
        // create songArray
        // create elements
// selecting an artist
// 2. bringing songs to cards / songArray creation - end
// 3. selecting the song - start
    //3.1 getting song details
    //3.2 updating player left section
    //3.3 updating the music variables
    //3.4 playing the song
// 3. selecting the song - end
// 4. player controls - start
// 4.1 playing the selected song 
// 4.2 updating the time
// 4.3 seek control
// 4.4 if music ended
// 4.5 volume controls
// 4.6 next, previous, forward, backward buttons
// 4.7 shuffle button
// 4. player controls - end
// 5. Playlist - start
// 5.1 Add to playlist
// 5.2 Generate Playlists
// 5.3 Playlist icon update
// 5.4 playlist selections play
// 5.5 remove from playlist
// 5. Playlist - end
// 6. Other funtions:
// 6.1  scroll functions

*/

// golbal - start 
// selectors
const navBar = document.querySelector('.nav');
const midBody = document.querySelector('.mid_section');
const bgBlur = document.querySelector('#inactive_section');
const playList = document.querySelector('#playlist');  // getElementById not working̥̥
const searchList = document.querySelector('#searchList');  // getElementById not working̥̥
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
const imageHue = document.querySelector('#logo');

const artistsContainer = document.querySelector('#artists-container');
const albumsContainer = document.querySelector('#albums-container');
const tracksContainer = document.querySelector('#tracks-container');
const albumTitleName = document.querySelector('#album_title_name');
const trackTitleName = document.querySelector('#track_title_name');

const albumSection = document.querySelector(".album_section");
const trackSection = document.querySelector(".tracks_section");

const artistsSearchContainer = document.querySelector('#artUOderedList');
const albumsSearchContainer = document.querySelector('#albUOderedList');
const tracksSearchContainer = document.querySelector('#traUOderedList');

const searchMusic = document.querySelector("#search_song");
// variables
const baseUrl= "https://api.napster.com/v2.2";
const callApiKey = "apikey=YWNkZDJkZjktN2Y0ZS00MTExLWI2MzAtNmE4ZDZlODI3MWRk";



// funtions
function fetchLink(midLink) {
    return baseUrl + midLink + callApiKey;
}

// golbal - end


// 1. Playlist open close on UI - start
function openPlayList() {
    navBar.classList.add("blur_bg");
    midBody.classList.add("blur_bg");
    bgBlur.style.display='initial';
    playList.classList.remove("playlist_animation_close");
    playList.classList.add("playlist_animation_open");
}

// 1.1 searchlist open close on UI - start
function openSearchList() {
    // navBar.classList.add("blur_bg");
    midBody.classList.add("blur_bg");
    bgBlur.style.display='initial';
    searchList.classList.remove("searchList_animation_close");
    searchList.classList.add("searchList_animation_open");
}

function backToMain() {
    navBar.classList.remove("blur_bg");
    midBody.classList.remove("blur_bg");
    bgBlur.style.display='none';
    playList.classList.add("playlist_animation_close");
    playList.classList.remove("playlist_animation_open");
    searchList.classList.add("searchList_animation_close");
    searchList.classList.remove("searchList_animation_open");
}
// 1. Playlist open close on UI - end

// 2. bringing songs to cards / songArray creation- start
// top artists
async function getArtists(){
    let artistArray = [];
    const artistsAPI = await fetch(fetchLink("/artists/top?"));
    const artistItems = await artistsAPI.json();
    artistArray = artistItems.artists;
    // console.log(artistArray);

    let newElement = "";
    artistArray.forEach(artist => {
        let artistId = artist.id;
        let artistName = artist.name;        ;
        let artistImage = `https://api.napster.com/imageserver/v2/artists/${artistId}/images/170x170.jpg`;

        // create elements
        newElement += (`<div id="artist_count" onclick="getArtistAlbumTracks(this)" data-artistId="${artistId}" data-artistName="${artistName}" data-type="artist">
        <img draggable="false" class="artist_image" src="${artistImage}" onerror="this.src='./img/artist-default.png';this.onerror='';" />
        <h2 id="artist-name">${artistName}</h2>
      </div>`);
    });
    artistsContainer.innerHTML = newElement;
}
getArtists();

// top albums
async function getAlbums(e=""){
    let albumArray = [];
    let albumTitle = " ";
    let albumsAPI = "";
    if (e === "") {
    albumsAPI = await fetch(fetchLink("/albums/top?"));
    }
    else {
    albumsAPI = await fetch(fetchLink(`/artists/${e.getAttribute("data-artistId")}/albums/top?`));
    albumTitle = e.getAttribute("data-artistName") + " ";
    }
    const albumItems = await albumsAPI.json();
    albumArray = albumItems.albums;
    // console.log(albumArray);

    let newElement = "";
    albumArray.forEach(album => {
        let albumId = album.id;
        let albumName = album.name;        ;
        let albumImage = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`;

        // create elements
        newElement += (`<div id="album_count" onclick="getAlbumTracks(this)" data-albumId="${albumId}" data-albumName="${albumName}" data-type="album">
        <img draggable="false" class="album_image" src="${albumImage}" onerror="this.src='./img/album-default.png';this.onerror='';" />
        <h2 id="album-name">${albumName}</h2>
      </div>`);
    });
    albumsContainer.innerHTML = newElement;
    albumTitleName.innerHTML = albumTitle;
    highlightAlbums();
}
getAlbums();

// top and new tracks general
let songsArray = [];
async function getTracksgeneral(){
    let trackArray1 = [];
    let trackArray2 = [];
    songsArray = [];
    const tracksAPI1 = await fetch(fetchLink(`/tracks/top?`));
    const tracksAPI2 = await fetch(fetchLink(`/tracks/top?offset=20&`));
    const trackItems1 = await tracksAPI1.json();
    const trackItems2 = await tracksAPI2.json();
    trackArray1 = trackItems1.tracks;
    trackArray2 = trackItems2.tracks;
    // console.log(trackArray1);
    // console.log(trackArray2);

    let newTrackElement = "";

    trackArray1.forEach(track => {
        let trackId = track.id;
        let trackName = track.name;
        let artistName = track.artistName;
        let audioURL = track.previewURL;
        let albumId = track.albumId;
        let trackImage = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`;

        // create songArray
        songsArray.push({
            id: trackId,
            songName: trackName,
            artistName: artistName,
            audioURL: audioURL,
            albumImg: trackImage
        });

        // create elements
        newTrackElement += (`<div class="track_count" onclick="getId(this)" ondblclick="add_remove_playlist()" id="${trackId}">
        <img draggable="false" class="track_image" src="${trackImage}" onerror="this.src='./img/track-default.jpg';this.onerror='';" />
        <h2 id="track-name">${trackName}</h2>
      </div>`);
    });

    trackArray2.forEach(track => {
        let trackId = track.id;
        let trackName = track.name;
        let artistName = track.artistName;
        let audioURL = track.previewURL;
        let albumId = track.albumId;
        let trackImage = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`;

        // create songArray
        songsArray.push({
            id: trackId,
            songName: trackName,
            artistName: artistName,
            audioURL: audioURL,
            albumImg: trackImage
        });

        // create elements
        newTrackElement += (`<div class="track_count" onclick="getId(this)" ondblclick="add_remove_playlist()" id="${trackId}">
        <img draggable="false" class="track_image" src="${trackImage}" onerror="this.src='./img/track-default.jpg';this.onerror='';" />
        <h2 id="track-name">${trackName}</h2>
      </div>`);
    });
    tracksContainer.innerHTML = newTrackElement;
}
getTracksgeneral();

// tracks for artist/album
async function getTracks(e){
    let trackArray = [];
    songsArray = [];
    let trackTitle = " ";
    let tracksAPI = "";
    if (e.getAttribute("data-type") === "artist") {
        tracksAPI = await fetch(fetchLink(`/artists/${e.getAttribute("data-artistId")}/tracks/top?`));
        trackTitle = "Top " + e.getAttribute("data-artistName") + " ";
    }
    else {
        tracksAPI = await fetch(fetchLink(`/albums/${e.getAttribute("data-albumId")}/tracks?`));
        trackTitle = e.getAttribute("data-albumName") + " ";
    }
    const trackItems = await tracksAPI.json();
    trackArray = trackItems.tracks;
    // console.log(trackArray);
    
    let newTrackElement = "";
    trackArray.forEach(track => {
        let trackId = track.id;
        let trackName = track.name;
        let artistName = track.artistName;
        let audioURL = track.previewURL;
        let albumId = track.albumId;
        let trackImage = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`;

        // create songArray
        songsArray.push({
            id: trackId,
            songName: trackName,
            artistName: artistName,
            audioURL: audioURL,
            albumImg: trackImage
        });

        // create elements
        newTrackElement += (`<div class="track_count" onclick="getId(this)" ondblclick="add_remove_playlist()" id="${trackId}">
        <img draggable="false" class="track_image" src="${trackImage}" onerror="this.src='./img/track-default.jpg';this.onerror='';" />
        <h2 id="track-name">${trackName}</h2>
      </div>`);
    });
    tracksContainer.innerHTML = newTrackElement;
    trackTitleName.innerHTML = trackTitle;
    highlightTracks();
}

// selecting an artist
function getArtistAlbumTracks(e) {
    getAlbums(e);
    getTracks(e);
    backToMain();
}
function getAlbumTracks(e) {
    getTracks(e);
    backToMain();
}
console.log("Songs Array");
console.log(songsArray);
console.log("Songs Array  🔚");
// 2. bringing songs to cards / songArray creation - end

// 3. selecting the song - start
let currSongId = "";
let currSong = "./music/sample_music.mp3";
let currSongIndex = null;
let music = new Audio();
music.src = currSong;

function getId(e) {
    play_pause();
    currSongId = e.id;
    //3.1 getting song details
    let selectedSongObj = songsArray.find(item => item.id === currSongId);
    // console.log("The song is :");
    // console.log(selectedSongObj);
    // console.log(`Song Index is: ${songsArray.indexOf(selectedSongObj)}`);


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
let x = window.matchMedia("(min-height: 560px)")
function play_pause() {
    if (music.paused) {
        music.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
        playerAlbumCover.classList.add('rotate');
        playerAlbumCover.style.height='150%';
        if (x.matches) { playerAlbumCover.style.height='100%'; }

    }
    else {
        music.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        playerAlbumCover.classList.remove('rotate');
        playerAlbumCover.style.height='100%';
        if (x.matches) { playerAlbumCover.style.height='60%'; }
    }
}

// 4.2 updating the time
// music.addEventListener('timeupdate', () => {})
music.ontimeupdate = function updateTime(){
    let music_curr = music.currentTime;
    let music_dur = music.duration;


    let min1 = Math.floor(music_curr / 60)||0;
    let sec1 = Math.floor(music_curr % 60)||0;
    sec1 = (sec1<10)? `0${sec1}` : sec1;
    currTime.innerHTML = `${min1}:${sec1}`;

    let min2 = Math.floor(music_dur / 60)||0;
    let sec2 = Math.floor(music_dur % 60)||0;
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
music.volume = 0.2;
volBar2.style.width = '20%';
volBarDot.style.left = '20%';
volIcon.addEventListener('click', () => {
    if (music.volume >0 ) {
        music.volume = 0;
        volIcon.classList.remove('fa-volume-high');
        volIcon.classList.add('fa-volume-xmark');
        volBar2.style.width = 0;
        volBarDot.style.left = 0;
    }
    else {
        music.volume = 0.5;
        volIcon.classList.add('fa-volume-high');
        volIcon.classList.remove('fa-volume-xmark');
        volBar2.style.width = '50%';
        volBarDot.style.left = '50%';
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
        newPlElement += (`<li class="pl_items">
        <div id="plSongInfo" onclick="playListItem(this)" data-songid="${value.id}" data-songurl="${value.audioURL}" data-albImg="${value.albumImg}" data-sngName="${value.songName}" data-artName="${value.artistName}">
            <img draggable="false" id="pl_album_image" src="${value.albumImg}" onerror="this.src='./img/album-default.png';this.onerror='';"alt="album image" />
            <h5 id="plHead">
            ${value.songName}
            <div>${value.artistName}</div>
            </h5>
        </div>
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
    music.src = e.getAttribute("data-songurl");
    playerAlbumCover.src = e.getAttribute("data-albImg");
    playerSongName.innerText = e.getAttribute("data-sngName");
    playerSubTitle.innerText = e.getAttribute("data-artName");
    currSongId = e.getAttribute("data-songid");
    play_pause();
    playListIconUpdate();
}

// 5.5 remove from playlist
function removeFromPlaylist(e) {
    let remId = e.getAttribute("data-songid");
    localStorage.removeItem(remId);
    generatePlayList();
}

// 5. Playlist - end


// 6. Other funtions:
// 6.1  scroll functions
function artLeftArrow() {
    document.querySelector(`#artists-container`).scrollLeft -= 500;
}
function artRightArrow() {
    document.querySelector(`#artists-container`).scrollLeft += 500;
}
function albLeftArrow() {
    document.querySelector(`#albums-container`).scrollLeft -= 500;
}
function albRightArrow() {
    document.querySelector(`#albums-container`).scrollLeft += 500;
}

// 6.2 highlight functions
function highlightAlbums() {
    albumSection.classList.add("highlight");
    setInterval(()=>{
        albumSection.classList.remove("highlight");
    },2000);
}
function highlightTracks() {
    trackSection.classList.add("highlight");
    setInterval(()=>{
        trackSection.classList.remove("highlight");
    },2000);
}

// 6.3 Search music
// let keyWord = searchMusic.value;

let keyWord; // = "weezer";
let timeout;
function onKeyUpHandler() {
    keyWord = searchMusic.value;
    if (keyWord === "") { return; }
    clearTimeout(timeout);
    timeout = setTimeout(async () =>{
        const searchInMusicAPI = await fetch(fetchLink(`/search?query=${keyWord}&pert_type_mimit=3&`));
        const searchInMusicArray = await searchInMusicAPI.json();
        const searchArtistArray = searchInMusicArray.search.data.artists;
        const searchAlbumArray = searchInMusicArray.search.data.albums;
        const searchTrackArray = searchInMusicArray.search.data.tracks;
        // console.log(`Keyword is:${keyWord}`);
        console.log(searchArtistArray);
        console.log(searchAlbumArray);
        console.log(searchTrackArray);
        getSearchArtists(searchArtistArray);
        getSearchAlbums(searchAlbumArray);
        getSearchTracks(searchTrackArray);

    },400);
}

searchMusic.addEventListener('keyup', onKeyUpHandler);

function getSearchArtists(artistArray) {
    let newElement = "";
    artistArray.forEach(artist => {
        let artistId = artist.id;
        let artistName = artist.name;        ;
        let artistImage = `https://api.napster.com/imageserver/v2/artists/${artistId}/images/170x170.jpg`;

        // create elements
        newElement += (`<li class="searchlist_item" onclick="getArtistAlbumTracks(this)" data-artistId="${artistId}" data-artistName="${artistName}" data-type="artist">
            <div id="searchSongInfo">
                <img
                draggable="false"
                id="search_album_image"
                src="${artistImage}"
                onerror="this.src='./img/artist-default.png';this.onerror='';"
                alt="image"
                />
                <h5 id="searchHead">${artistName}
                <div> </div>
                </h5>
            </div>
            </li>`);
    });
    artistsSearchContainer.innerHTML = newElement;
}

function getSearchAlbums(albumArray) {
    let newElement = "";
    albumArray.forEach(album => {
        let albumId = album.id;
        let albumName = album.name;        ;
        let albumImage = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`;
        let artistName = album.artistName;

        // create elements
        newElement += (`<li class="searchlist_item" onclick="getAlbumTracks(this)" data-albumId="${albumId}" data-albumName="${albumName}" data-type="album">
                <div id="searchSongInfo" >
                  <img draggable="false"
                    id="search_album_image"
                    src="${albumImage}"
                    onerror="this.src='./img/album-default.png';this.onerror='';"
                    alt="image" />
                  <h5 id="searchHead">${albumName}
                    <div>${artistName}</div>
                  </h5>
                </div>
              </li>`);
    });
    albumsSearchContainer.innerHTML = newElement;
    highlightAlbums();
}

function getSearchTracks(trackArray) {
    let newTrackElement = "";
    trackArray.forEach(track => {
        let trackId = track.id;
        let trackName = track.name;
        let artistName = track.artistName;
        let audioURL = track.previewURL;
        let albumId = track.albumId;
        let trackImage = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`;

        // create songArray
        songsArray.push({
            id: trackId,
            songName: trackName,
            artistName: artistName,
            audioURL: audioURL,
            albumImg: trackImage
        });

        // create elements
        newTrackElement += (`<li class="searchlist_item" onclick="playMe(this)" ondblclick="add_remove_playlist()" id="${trackId}" 
        data-trackId = "trackId" data-trackName = "${trackName}" data-artistName = "${artistName}" data-audioURL = "${audioURL}" data-albumId = "${albumId}" data-trackImage = "${trackImage}" >
                <div id="searchSongInfo">
                  <img draggable="false"
                    id="search_album_image"
                    src="${trackImage}" onerror="this.src='./img/track-default.jpg';this.onerror='';"
                    alt="image" />
                  <h5 id="searchHead">${trackName}
                    <div>${artistName}</div>
                  </h5>
                </div>
              </li>`);
    });
    tracksSearchContainer.innerHTML = newTrackElement;
    highlightTracks();
}

function playMe(e) {
    play_pause();
    currSongId = e.id;

    //3.2 updating player left section
    playerAlbumCover.src = e.getAttribute("data-trackImage");
    playerSongName.innerText = e.getAttribute("data-trackName");
    playerSubTitle.innerText = e.getAttribute("data-artistName");

    //3.3 updating the music variables
    currSong = e.getAttribute("data-audioURL");
    music.src = currSong;
    //3.4 playing the song
    play_pause();
    playListIconUpdate();
}