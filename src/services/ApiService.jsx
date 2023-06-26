import axios from 'axios';

const KEY = '3b90c65c34311d75a82ba40dcf7a0596';
const URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'language=en-US';

export async function ApiFetchCast(movieId) {
  try {
    const urlByID = `${URL}/movie/${movieId}/credits?${LANGUAGE}&api_key=${KEY}`;

    const response = await axios.get(urlByID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchReviews(movieId) {
  try {
    const urlByID = `${URL}/movie/${movieId}/reviews?${LANGUAGE}&page=1&api_key=${KEY}&include_image_language=en,null`;

    const response = await axios.get(urlByID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchFilm(movieId) {
  try {
    const urlByID = `${URL}/movie/${movieId}?${LANGUAGE}&api_key=${KEY}`;
    const response = await axios.get(urlByID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchTrendingDay() {
  try {
    const urlTrendsDay = `${URL}/trending/movie/day?api_key=${KEY}`;
    const response = await axios.get(urlTrendsDay);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchByQuery(query) {
  try {
    const urlByQuery = `${URL}/search/movie?query=${query}&${LANGUAGE}&api_key=${KEY}`;

    const response = await axios.get(urlByQuery);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
