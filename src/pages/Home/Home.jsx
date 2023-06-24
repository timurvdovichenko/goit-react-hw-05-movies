import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ApiService from 'services/ApiService';
import { HomeList, HomeListItem, HomeListItemImg } from './Home.styled';

const Home = () => {
  const [markup, setMarkup] = useState(null);
  const location = useLocation();
  useEffect(() => {
    async function fetchTrending() {
      try {
        const urlTrendsDay = `https://api.themoviedb.org/3/trending/movie/day?api_key=3b90c65c34311d75a82ba40dcf7a0596`;
        const fetchResponse = await ApiService(urlTrendsDay);

        function makeMarkup(data) {
          return data.results.map(({ poster_path, title, id }) => {
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
          });
        }

        const markupSearch = makeMarkup(fetchResponse);
        setMarkup(markupSearch);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrending();
  }, [location]);

  return (
    <main>
      <h1>Trending today</h1>
      <HomeList>{markup}</HomeList>
    </main>
  );
};

export default Home;
