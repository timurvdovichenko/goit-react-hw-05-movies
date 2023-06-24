import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from 'services/ApiService';

const Reviews = () => {
  const { movieId } = useParams();
  const [markup, setMarkup] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const urlByID = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1&api_key=3b90c65c34311d75a82ba40dcf7a0596&include_image_language=en,null`;

        const fetchResponse = await ApiService(urlByID);
        const markupCast = makeMarkup(fetchResponse);
        setMarkup(markupCast);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCast();
  }, [movieId]);

  function makeMarkup(data) {
    return data.results.map(({ author, content }) => {
      return (
        <li key={nanoid()}>
          <h3>{author}</h3>
          <p>{content}</p>
        </li>
      );
    });
  }

  if (!markup || markup.length === 0) {
    return <div>We don`t have any reviews for this movie</div>;
  }

  if (markup) {
    return <ul>{markup}</ul>;
  }
};
export default Reviews;
