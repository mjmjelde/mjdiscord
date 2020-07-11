const radarr = require('./dist/lib/radarr')
const c = new radarr.Radarr()
const luxon = require('luxon')
c.searchMovie('Mercy').then((data) => {
  const movies = data.map(movie => `${movie.title} (${luxon.DateTime.fromISO(movie.inCinemas).year})`);
  movies.forEach(movie => {
    console.log(movie);
  });
})
