import SearchBar from 'components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ApiFetchByQuery } from 'services/ApiService';
import { Notify } from 'notiflix';
import MovieList from 'components/MovieList/MovieList';

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
      {data !== null && <MovieList data={data} location={location} />}
    </>
  );
};

export default Movies;
