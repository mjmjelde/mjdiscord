import axios, { AxiosInstance } from "axios";
import { Profile, RootFolder } from "./radarr_types";

export class AbstractClient {
  protected client: AxiosInstance;
  constructor(baseUrl: string, apiKey: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-Api-Key': apiKey
      }
    });
  }

  public profiles(): Promise<Profile[]> {
    return new Promise<Profile[]>((resolve, reject) => {
      this.client.get('/profile').then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public rootFolders(): Promise<RootFolder[]> {
    return new Promise<RootFolder[]>((resolve, reject) => {
      this.client.get(`/rootfolder`).then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}