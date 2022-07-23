import { Review } from '../types/review';

function AddReviewDetails (props:Review){
  const {name, date, rating, comment} = props;
  return (
    <div key={date} className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime="2016-12-24">{date}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}
export {AddReviewDetails};
