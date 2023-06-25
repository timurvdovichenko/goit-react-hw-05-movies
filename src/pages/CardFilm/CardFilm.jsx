import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { ApiFetchFilm } from 'services/ApiService';

const CardFilm = () => {
  const { movieId } = useParams();
  const [response, setResponse] = useState(null);
  const location = useLocation();
  const goBackLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    async function fetchFilm() {
      try {
        const fetchResponse = await ApiFetchFilm(movieId);
        setResponse(fetchResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFilm();
  }, [movieId]);

  function getGenres(genres) {
    const genresList = genres.map(genre => {
      return genre.name;
    });
    return genresList.join(', ');
  }

  if (response) {
    return (
      <>
        <Link to={goBackLinkRef.current}>Go Back</Link>
        <img
          width={250}
          src={`https://image.tmdb.org/t/p/original${response.poster_path}`}
          alt={response.tagline}
        />
        <h2>{response.title}</h2>
        <p>User Score: {response.vote_average * 10}%</p>
        <h3>Overview</h3>
        <p>{response.overview}</p>
        <h4>Genres</h4>
        <p>{getGenres(response.genres)}</p>
        <p>Additional information</p>
        <p>
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>
        </p>
        <Suspense fallback={<div>Loading... Please wait</div>}>
          <Outlet />
        </Suspense>
      </>
    );
  }
};

export default CardFilm;
