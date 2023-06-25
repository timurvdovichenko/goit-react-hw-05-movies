import axios from 'axios';

export async function ApiFetchCast(movieId) {
  try {
    const urlByID = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=3b90c65c34311d75a82ba40dcf7a0596`;

    const response = await axios.get(urlByID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchReviews(movieId) {
  try {
    const urlByID = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1&api_key=3b90c65c34311d75a82ba40dcf7a0596&include_image_language=en,null`;

    const response = await axios.get(urlByID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchFilm(movieId) {
  try {
    const urlByID = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=3b90c65c34311d75a82ba40dcf7a0596`;
    const response = await axios.get(urlByID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchTrendingDay() {
  try {
    const urlTrendsDay = `https://api.themoviedb.org/3/trending/movie/day?api_key=3b90c65c34311d75a82ba40dcf7a0596`;
    const response = await axios.get(urlTrendsDay);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function ApiFetchByQuery(query) {
  try {
    const urlByQuery = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&&api_key=3b90c65c34311d75a82ba40dcf7a0596`;

    const response = await axios.get(urlByQuery);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
