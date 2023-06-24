import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from 'services/ApiService';

const Cast = () => {
  const { movieId } = useParams();
  const [markup, setMarkup] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const urlByID = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=3b90c65c34311d75a82ba40dcf7a0596`;

        const fetchResponse = await ApiService(urlByID);
        console.log(fetchResponse.cast);

        function makeMarkup(data) {
          return data.cast.map(({ profile_path, name, character }) => {
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
          });
        }
        const markupCast = makeMarkup(fetchResponse);
        setMarkup(markupCast);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCast();
  }, [movieId]);

  if (markup) {
    return <ul>{markup}</ul>;
  }
};

export default Cast;
