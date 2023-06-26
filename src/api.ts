const API_KEY = "8d8ef69753e75e7d8a49a7261b364408";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetData {
  results: IResults[];
}

export interface IResults {
  id: number;
  name: string;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  media_type: string;
  release_date: string;
}

export interface IGenres {
  name: string;
}

export interface ISeasons {
  air_date: string;
  episode_count: number;
  overview: string;
  season_number: number;
}

export interface IGetMovieDetails {
  backdrop_path: string;
  genres: IGenres[];
  id: number;
  imdb_id: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTvDetails {
  genres: IGenres[];
  id: number;
  name: string;
  overview: string;
  number_of_episodes: number;
  number_of_seasons: number;
  popularity: number;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  last_air_date: string;
  seasons: ISeasons[];
  tagline: string;
  vote_average: number;
}

// MOVIE and TV Series API
export const getAllTrending = () => {
  return fetch(
    `${BASE_PATH}/trending/all/week?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

// MOVIE API
export const getNowPlaying = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getMoviePopular = () => {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getMovieRated = () => {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getUpComing = () => {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getMovieTrending = () => {
  return fetch(
    `${BASE_PATH}/trending/movie/week?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

export const getMovieDetails = (movieId: string) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

// TV Series API
export const getAiringToday = () => {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getOnTheAir = () => {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getTvTrending = () => {
  return fetch(
    `${BASE_PATH}/trending/tv/week?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

export const getTvPopular = () => {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getTvRated = () => {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getTvDetails = (seriesId: string) => {
  return fetch(
    `${BASE_PATH}/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
};

export const getSearch = (query: string | null) => {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getMovieSearch = (query: string | null) => {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
  ).then((response) => response.json());
};

export const getTvSearch = (query: string | null) => {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
  ).then((response) => response.json());
};

// https://api.themoviedb.org/3/tv/67915?api_key=8d8ef69753e75e7d8a49a7261b364408&language=ko-KR&page=1

// https://api.themoviedb.org/3/search/multi?api_key=8d8ef69753e75e7d8a49a7261b364408&query=dune&include_adult=false&language=en-US&page=1
