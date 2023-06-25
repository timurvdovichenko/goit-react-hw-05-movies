import SearchBar from 'components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ApiFetchByQuery } from 'services/ApiService';
import { MoviesList, MoviesListItem, MoviesListItemImg } from './Movies.styled';
import { Notify } from 'notiflix';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const location = useLocation();

  function submitFormSearchbarHandler(data) {
    setSearchParams({ query: data });
  }

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchByQuery() {
      try {
        const query = searchParams.get('query');

        if (!query) {
          return;
        }

        const fetchResponse = await ApiFetchByQuery(query);
        if (fetchResponse.results.length === 0) {
          Notify.failure('There is no films');
        }

        setData(fetchResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchByQuery();
  }, [location, searchParams]);

  return (
    <>
      <SearchBar onSubmit={submitFormSearchbarHandler} queryLink={searchParams.get('query')} />
      {data !== null && (
        <MoviesList>
          {data.results.map(({ poster_path, title, id }) => {
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
          })}
        </MoviesList>
      )}
    </>
  );
};

export default Movies;
