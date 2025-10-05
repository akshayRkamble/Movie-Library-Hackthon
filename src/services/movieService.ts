import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

const getMovieDetails = async (movieId: number): Promise<Movie> => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'external_ids,credits,watch/providers,release_dates',
    },
  });
  
  // Rename watch/providers to watch_providers in the response
  const data = response.data;
  if (data['watch/providers']) {
    data.watch_providers = data['watch/providers'];
    delete data['watch/providers'];
  }
  
  return data;
};

const enrichMoviesWithDetails = async (movies: Movie[]): Promise<Movie[]> => {
  const enrichedMovies = await Promise.all(
    movies.map(async (movie) => {
      try {
        return await getMovieDetails(movie.id);
      } catch (error) {
        console.error(`Failed to fetch details for movie ${movie.id}:`, error);
        return movie;
      }
    })
  );
  return enrichedMovies;
};

export const getPopularMovies = async (page = 1, region?: string): Promise<MovieResponse> => {
  const response = await api.get('/movie/popular', {
    params: {
      page,
      region: region !== 'all' ? region : undefined,
    },
  });
  const enrichedResults = await enrichMoviesWithDetails(response.data.results);
  return { ...response.data, results: enrichedResults };
};

export const searchMovies = async (
  query: string,
  page = 1,
  region?: string
): Promise<MovieResponse> => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      page,
      region: region !== 'all' ? region : undefined,
      include_adult: false,
    },
  });
  const enrichedResults = await enrichMoviesWithDetails(response.data.results);
  return { ...response.data, results: enrichedResults };
};