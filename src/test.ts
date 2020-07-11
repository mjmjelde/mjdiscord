import * as config from "config";
import { Radarr } from './lib/radarr';

async function test() {
  const radarr = new Radarr(config.get("radarr.baseurl"), config.get("radarr.apikey"));
  const movies = await radarr.searchMovie("The King of Staten Island");
  const profiles = await radarr.profiles();
  const roots = await radarr.rootFolders();
  const profile = profiles.filter(profile => profile.name == "HD-1080p")[0];
  radarr.addMovie(movies[0], profile, roots[0]).then((movie) => {
    console.log("Movie added!");
  }).catch((err) => {
    console.log(JSON.stringify(err));
  });
}

test();
