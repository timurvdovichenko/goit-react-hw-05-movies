import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiFetchCast } from 'services/ApiService';

const Cast = () => {
  const { movieId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const fetchResponse = await ApiFetchCast(movieId);
        setData(fetchResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCast();
  }, [movieId]);

  if (data) {
    return (
      <ul>
        {data.cast.map(({ profile_path, name, character }) => {
          return (
            <li key={nanoid()}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/original${profile_path}`
                    : `https://placehold.co/150x225?text=poster+is+not+available`
                }
                alt={name}
                width={150}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default Cast;
