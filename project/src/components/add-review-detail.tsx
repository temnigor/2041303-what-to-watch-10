import { Review } from '../types/review';
import { getDataTime } from '../utils';

function AddReviewDetails (props:Review){
  const {name, date, rating, comment} = props;
  const dateTime = getDataTime(date);
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={dateTime}>{date}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}
export {AddReviewDetails};
