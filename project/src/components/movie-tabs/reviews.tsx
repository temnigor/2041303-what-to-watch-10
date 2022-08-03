import { Review } from '../../types/review';
import { getDataTime } from '../../utils';


type ReviewsProps = {
  reviews: Review[]
}

const getReviewsJsx = (reviews:Review[]) =>
  reviews.map((review, i) => {
    const {name, date, rating, comment} = review;
    const dateTime = getDataTime(date);
    const keyReview = `review${i}`;
    return (
      <div key={keyReview} className="review">
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
  );

function Reviews (props:ReviewsProps):JSX.Element {
  if(props.reviews.length === 1 ){
    return (
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          {getReviewsJsx (props.reviews)}
        </div>
      </div>
    );
  }
  const mostOfHalf = Math.ceil(Number(props.reviews.length / 2));
  const reviewsPartOne = getReviewsJsx (props.reviews.slice(0, mostOfHalf));
  const reviewsPartTwo = getReviewsJsx(props.reviews.slice(mostOfHalf, props.reviews.length));
  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsPartOne}
      </div>
      <div className="film-card__reviews-col">
        {reviewsPartTwo}
      </div>
    </div>
  );
}

export {Reviews};
