'use strict'
//makes it so code wont run if error is present
document.addEventListener('DOMContentLoaded', main);

function retrieve_songs(artist) {
    return fetch(`https://itunes-api-proxy.glitch.me/search?term=${encodeURIComponent(artist)}&limit=100&entity=song`)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.json();
        })
}  
//retrieving songs from api, if error list what error is present if not return api list.
function querySelect(selector) {
    return document.querySelector(selector);
}
//returns first element found(when using search returns first element closest to what is being inputted)
function Play() {
    querySelect('#songs').addEventListener('click', function(event)//on click add "event"
     {
        if (event.target && event.target.nodeName === 'IMG') {    
            console.log('image item clicked');//makes it so when image that is pulled from api is clicked it wil start to play song by using audio id
            const img = event.target
            console.log(img.dataset['audioId'])
            let song = querySelect(`#${img.dataset['audioId']}`)
            if (!song.paused) 
            {song.pause(); //if click once play, if click again pause, if click again play
            } else {
                song.play();
            }
            
        }
    })
}

function main() {
    querySelect('#artist').addEventListener('change', function(event) {
        updateSongs(event.target.value)
    });
    Play();
}

function updateSongs(artist) {
    retrieve_songs(artist)
    .then(function (list_songs) {
        console.log(list_songs)
        const list_of_songs = querySelect('.song_list');
        list_of_songs.innerText = "";
        for (let song of list_songs.results) {
            const Artists = document.createElement('div');
            const song_information = document.createElement('div');
            const Songs = document.createElement('div');
            const Album = document.createElement('div');
            const Image = document.createElement('div');
            const audio = document.createElement('audio');
            
            song_information.classList.add("song_info");

            Image.innerHTML = `<img data-audio-id="audio-id${list_songs.results.indexOf(song)}" class="song_image" src="${song.artworkUrl100}" alt="${song.collectionName}">`
            audio.id = `audio-id${list_songs.results.indexOf(song)}`
            audio.classList.add("song_audio");
            audio.innerHTML = `<source src="${song.previewUrl}">`
            Songs.classList.add("song");
            Songs.innerHTML = `<span class="label">Track: </span>${song.trackName}`;
            Album.classList.add("song");
            Album.innerHTML = `<span class="label">Album: </span>${song.collectionName}`;
            Artists.classList.add("song");
            Artists.innerHTML = `<span class="label">Artist: </span>${song.artistName}`;

            Image.append(audio);
            song_information.appendChild(Image);
            song_information.appendChild(Songs);
            song_information.appendChild(Album);
            song_information.appendChild(Artists);
            
            list_of_songs.appendChild(song_information);
        }
    })
}
