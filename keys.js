
console.log('this is loaded');

(exports.spotify = {
  key: process.env.SPOTIFY_KEY,
  secret: process.env.SPOTIFY_SECRET
}),

(exports.omdb = { 
    key: process.env.OMDB_API_KEY
}),

(exports.bands = {
    key: process.env.codingbootcamp
})