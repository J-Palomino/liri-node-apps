
require("dotenv").config();

var request = require("request");
var keys = require("./keys");
const fs = require("fs");
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var commandType = process.argv[2];
var inputParam = process.argv[3];

InputData(commandType, inputParam);

function InputData(commandType, inputParam) {
  switch (commandType.toLowerCase()) {
    case 'movie-this':
      dispMovieData(inputParam);
      break;
    case 'concert-this':
      dispConcertData(inputParam);
      break;
    case 'do-what-it-says':
      dispWhatData(inputParam);
      break;
    case 'spotify-this-song':
      dispSpotifyData(inputParam);
      break;
    default:
      console.log("Ivalid, Please use any of the following commands: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
  }
}

