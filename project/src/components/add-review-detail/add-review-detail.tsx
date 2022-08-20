import { getCommentTime, getDataTime } from '../../utils';

type AddReviewDetailsProps = {
  name:string,
  date:string,
  rating:number,
  comment:string
}

function AddReviewDetails ({name, date, rating, comment}:AddReviewDetailsProps){
  const dateTime = getDataTime(date);
  const commentsTime = getCommentTime(date);
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={dateTime}>{commentsTime}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}
export {AddReviewDetails};
