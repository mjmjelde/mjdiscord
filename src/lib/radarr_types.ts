export interface Movie {
  title: string;
  alternativeTitles?: string[];
  secondaryYearSourceId: number;
  sortTitle: string;
  sizeOnDisk: number;
  status: string;
  overview: string;
  inCinemas: string;
  images?: ImagesEntity[];
  downloaded: boolean;
  remotePoster: string;
  year: number;
  hasFile: boolean;
  profileId: number;
  pathState: string;
  monitored: boolean;
  minimumAvailability: string;
  isAvailable: boolean;
  folderName: string;
  runtime: number;
  tmdbId: number;
  titleSlug: string;
  genres?: string[];
  tags?: string[];
  added: string;
  ratings: Ratings;
  qualityProfileId: number;
}
export interface ImagesEntity {
  coverType: string;
  url: string;
}
export interface Ratings {
  votes: number;
  value: number;
}

export interface Cutoff {
  id: number;
  name: string;
  source: string;
  resolution: string;
  modifier: string;
}

export interface Quality {
  id: number;
  name: string;
  source: string;
  resolution: string;
  modifier: string;
}

export interface Item {
  quality: Quality;
  allowed: boolean;
}

export interface FormatCutoff {
  name: string;
  formatTags: any[];
}

export interface Format {
  name: string;
  formatTags: any[];
}

export interface FormatItem {
  format: Format;
  allowed: boolean;
}

export interface Profile {
  name: string;
  cutoff: Cutoff;
  preferredTags: string;
  items: Item[];
  formatCutoff: FormatCutoff;
  formatItems: FormatItem[];
  language: string;
  id: number;
}

export interface RootFolder {
  path: string;
  freeSpace: number;
  totalSpace: number;
  id: number;
}