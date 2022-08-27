import { Review } from '../../types/review';
import { getCommentTime, getDataTime } from '../../utils/utils';

const getReviewsJsx = (reviews:Review[]) =>
  reviews.map((review, i) => {
    const {user, date, rating, comment} = review;
    const dateTime = getDataTime(date);
    const commentsTime = getCommentTime(date);
    const keyReview = `review${i}`;
    return (
      <div key={keyReview} className="review">
        <blockquote className="review__quote">
          <p className="review__text">{comment}</p>
          <footer className="review__details">
            <cite className="review__author">{user.name}</cite>
            <time className="review__date" dateTime={dateTime}>{commentsTime}</time>
          </footer>
        </blockquote>
        <div className="review__rating">{rating}</div>
      </div>
    );
  }
  );

  type ReviewsTabProps = {
    reviews:Review[]
  };

function ReviewsTab ({reviews}:ReviewsTabProps):JSX.Element {
  if(reviews.length === 1 ){
    return (
      <div className="film-card__reviews film-card__row">
        <div className="film-card__reviews-col">
          {getReviewsJsx (reviews)}
        </div>
      </div>
    );
  }
  const mostOfHalf = Math.ceil(Number(reviews.length / 2));
  const reviewsPartOne = getReviewsJsx (reviews.slice(0, mostOfHalf));
  const reviewsPartTwo = getReviewsJsx(reviews.slice(mostOfHalf, reviews.length));
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

export {ReviewsTab};
