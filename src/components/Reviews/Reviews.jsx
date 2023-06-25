import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiFetchReviews } from 'services/ApiService';

const Reviews = () => {
  const { movieId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const fetchResponse = await ApiFetchReviews(movieId);
        setData(fetchResponse);
      } catch (error) {
        console.log(error);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (!data || data.length === 0) {
    return <div>We don`t have any reviews for this movie</div>;
  }

  if (data) {
    return (
      <ul>
        {data.results.map(({ author, content }) => {
          return (
            <li key={nanoid()}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          );
        })}
      </ul>
    );
  }
};
export default Reviews;
