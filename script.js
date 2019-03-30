'use strict'
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

function querySelect(selector) {
    return document.querySelector(selector);
}

function Play() {
    querySelect('#songs').addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === 'IMG') {    
            console.log('image item clicked');
            const img = event.target
            console.log(img.dataset['audioId'])
            let song = querySelect(`#${img.dataset['audioId']}`)
            if (!song.paused) {
                song.pause();
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
        const list_songsDiv = querySelect('.song_list');
       