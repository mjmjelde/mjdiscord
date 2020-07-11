import axios, { AxiosInstance } from "axios";
import { stringify } from "querystring";
import { Movie, Profile, RootFolder } from "./radarr_types";
import { AbstractClient } from "./abstract_client";
import { resolve } from "path";

export class Radarr extends AbstractClient {

  public movies(): Promise<Movie[]> {
    return new Promise<Movie[]>((resolve, reject) => {
      this.client.get('/movie').then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public searchMovie(movie: string): Promise<Movie[]> {
    return new Promise<Movie[]>((resolve, reject) => {
      this.client.get(`/movie/lookup?${stringify({term: movie})}`).then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public addMovie(movie: Movie, profile: Profile, root: RootFolder): Promise<Movie> {
    return new Promise<Movie>((resolve, reject) => {
      this.client.post(`/movie`, {
        title: movie.title,
        qualityProfileId: profile.id,
        titleSlug: movie.titleSlug,
        images: movie.images,
        tmdbId: movie.tmdbId,
        year: movie.year,
        rootFolderPath: root.path,
        monitored: true,
        addOptions: {
          searchForMovie: true
        }
      }).then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
