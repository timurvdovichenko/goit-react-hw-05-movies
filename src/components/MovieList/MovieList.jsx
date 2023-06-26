import { Link } from 'react-router-dom';
import { MovieListItemImgStyled, MovieListItemStyled, MovieListStyled } from './MovieList.styled';

const MovieList = ({ data, location }) => {
  return (
    <MovieListStyled>
      {data.results.map(({ poster_path, title, id }) => {
        return (
          <MovieListItemStyled key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              <MovieListItemImgStyled
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/original${poster_path}`
                    : `https://placehold.co/150x225?text=poster+is+not+available`
                }
                alt={title}
                width={250}
              />
            </Link>
          </MovieListItemStyled>
        );
      })}
    </MovieListStyled>
  );
};
export default MovieList;
