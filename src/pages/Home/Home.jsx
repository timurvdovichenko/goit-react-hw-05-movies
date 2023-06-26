import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiFetchTrendingDay } from 'services/ApiService';
import MovieList from 'components/MovieList/MovieList';

const Home = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    async function fetchTrending() {
      try {
        const fetchResponse = await ApiFetchTrendingDay();

        setData(fetchResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrending();
  }, [location]);

  if (data) {
    return (
      <main>
        <h1>Trending today</h1>
        <MovieList data={data} location={location} />
      </main>
    );
  }
};

export default Home;
