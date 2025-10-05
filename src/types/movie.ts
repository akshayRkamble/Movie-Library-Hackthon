interface Genre {
  id: number;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface WatchProviders {
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

interface ReleaseDate {
  certification: string;
  release_date: string;
  type: number; // 1: Premiere, 2: Theatrical, 3: Digital, 4: Physical
  note: string;
}

interface ReleaseDates {
  results: {
    iso_3166_1: string;
    release_dates: ReleaseDate[];
  }[];
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  imdb_id?: string;
  genres?: Genre[];
  production_countries?: ProductionCountry[];
  vote_count?: number;
  runtime?: number;
  original_language?: string;
  watch_providers?: {
    results: Record<string, WatchProviders>;
  };
  release_dates?: ReleaseDates;
  status?: string; // "Released", "Post Production", "In Production", etc.
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}