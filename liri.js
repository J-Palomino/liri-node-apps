

require("dotenv").config();
var axios = require("axios");
var chalk = require("chalk");
var moment = require("moment")
// var request = require("request");
var keys = require("./keys");
// const fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var commandType = process.argv[2];
var inputParam = process.argv.slice(3).join(" ");


InputData(commandType, inputParam);

function InputData(commandType, inputParam) {
  if (commandType && inputParam) {
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
        console.log(chalk.red("Ivalid Entry") + ("\nPlease use any of the following commands:") + chalk.blue("\nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says"))
    }
  }
  else{
    console.log("No input detected")
  }
}


function dispMovieData(inputParam) {
  let searchParam = "http://www.omdbapi.com/?apikey=" + keys.omdb.key + "&t=" + inputParam;
  axios.get(searchParam).then(function (response) {
    let sh = response.data
    let showData = ["              " + chalk.black.bgWhite.bold("              " + sh.Title + "              "),
    chalk.blue("Realeased:   ") + sh.Year,
    chalk.blue("Country: ") + sh.Country,
    chalk.blue("Language: ") + sh.Language,
    chalk.blue("Plot: ") + sh.Plot,
    chalk.blue("Cast: ") + sh.Actors,
    chalk.green("\t\t\t*** Ratings ***"),
    chalk.green("IMDB: ") + sh.imdbRating,
    chalk.green("Rotten Tomatoes: ") + sh.Ratings[1].Value,
    "              " + chalk.black.bgWhite.bold("                                           ")]
    showData.forEach((element) => {
      console.log(element)
    })
  })
}

function dispConcertData(inputParam) {
  let searchParam = "https://rest.bandsintown.com/artists/" + inputParam + "/events?app_id=codingbootcamp"
  //-------------------UN-COMMENT FOR FULL RESPONSE-------- */
  // console.log("------------------FULL RESPONSE--------------------")
  // axios.get(searchParam).then(function(response){
  //   console.log(response.data[0].venue)
  // })
  // console.log("****************END FULL RESPONSE*******************")
  //*********************************************************/
  //--------------------------AXIOS Call------------------- */
  axios.get(searchParam).then(function (response) {
    
    let sh = response.data
    console.log(sh.length)
    for (i = 0; i < sh.length; i++) {
      console.log(chalk.black.bgWhite.bold("              " + sh[0].lineup[0] + "              "))
      let showData = [
        "Venue: " + sh[i].venue.name,
        "Location: " + sh[i].venue.city +", "+sh[i].venue.region, sh[i].venue.country,
        "Date: " + moment(sh[i].datetime).calendar()]
      showData.forEach((element) => {
        console.log(element);
      
      })
    }
  });
  //********************************************************/
}

function dispSpotifyData(inputParam){
  Spotify.search({ type: "track", query: inputParam})
  .then(function(response){
  console.log(response)
  });
}
