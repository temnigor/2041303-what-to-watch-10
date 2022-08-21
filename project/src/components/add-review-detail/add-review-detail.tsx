import { useAppSelector } from '../../hooks';
import { getSentReview } from '../../store/data-api-process/selectors';
import { getCommentTime, getDataTime } from '../../utils';

function AddReviewDetails () {
  const sentReview = useAppSelector(getSentReview);
  if(sentReview.length === 0){
    return null;
  }
  const reviews = sentReview.map(({comment,date,id,rating,user})=>{
    const dateTime = getDataTime(date);
    const commentsTime = getCommentTime(date);
    return(
      <div key={id} className="review">
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
  });
  return (
    <div className="add-review__text">
      {reviews}
    </div>
  );
}
export {AddReviewDetails};
