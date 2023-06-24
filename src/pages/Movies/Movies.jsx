import SearchBar from 'components/SearchBar/SearchBar';
// import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import ApiService from 'services/ApiService';
import { MoviesList, MoviesListItem, MoviesListItemImg } from './Movies.styled';
import { Notify } from 'notiflix';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const location = useLocation();

  function submitFormSearchbarHandler(data) {
    setSearchParams({ query: data });
  }

  const [markup, setMarkup] = useState(null);

  useEffect(() => {
    async function fetchByQuery() {
      try {
        const query = searchParams.get('query');

        if (!query) {
          return;
        }
        const urlByQuery = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&&api_key=3b90c65c34311d75a82ba40dcf7a0596`;

        const fetchResponse = await ApiService(urlByQuery);
        if (fetchResponse.results.length === 0) {
          Notify.failure('There is no films');
        }

        function makeMarkup(data) {
          return data.results.map(({ poster_path, title, id }) => {
            return (
              <MoviesListItem key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  <MoviesListItemImg
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/original${poster_path}`
                        : `https://placehold.co/150x225?text=poster+is+not+available`
                    }
                    alt={title}
                    width={250}
                  />
                </Link>
              </MoviesListItem>
            );
          });
        }

        const markupSearch = makeMarkup(fetchResponse);
        setMarkup(markupSearch);
      } catch (error) {
        console.log(error);
      }
    }

    fetchByQuery();
  }, [location, searchParams]);

  return (
    <>
      <SearchBar onSubmit={submitFormSearchbarHandler} queryLink={searchParams.get('query')} />
      <MoviesList>{markup}</MoviesList>
    </>
  );
};

export default Movies;
