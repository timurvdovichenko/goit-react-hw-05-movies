import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ApiFetchTrendingDay } from 'services/ApiService';
import { HomeList, HomeListItem, HomeListItemImg } from './Home.styled';

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
        <HomeList>
          {data.results.map(({ poster_path, title, id }) => {
            return (
              <HomeListItem key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  <HomeListItemImg
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/original${poster_path}`
                        : `https://placehold.co/150x225?text=poster+is+not+available`
                    }
                    alt={title}
                    width={250}
                  />
                </Link>
              </HomeListItem>
            );
          })}
        </HomeList>
      </main>
    );
  }
};

export default Home;
