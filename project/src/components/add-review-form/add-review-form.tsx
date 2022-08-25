import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviveAction } from '../../store/api-action';
import { getIsErrorResponse, getIsLoadingFilms } from '../../store/data-api-process/selectors';
import { RatingStar } from '../rating-star/rating-star';
import { ReviewTextarea } from '../review-textarea/review-textarea';
const MAX_COMMENT_LENGTH = 400;
const MIN_COMMENT_LENGTH = 50;

type AddReviewFormProps = {
id:number,
}

function AddReviewForm ({id}:AddReviewFormProps){
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const [userRating, setUserRating] = useState(Math.floor(0));
  const [comment, setComment] = useState('');
  const isLoading = useAppSelector(getIsLoadingFilms);
  const dispatch = useAppDispatch();

  const isFilled = ()=>{
    if(comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && userRating !== 0 ){
      return true;
    }
    return false;
  };
  const updateStateHandler = (evt:FormEvent<HTMLTextAreaElement>):void => {
    evt.preventDefault();
    setComment(evt.currentTarget.value);
  };

  const handleReviewPost = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(comment.length < MIN_COMMENT_LENGTH || comment.length > MAX_COMMENT_LENGTH ) {
      return;
    }
    dispatch(postReviveAction({comment, rating:userRating, id}));
  };
  return(
    <form action="#" onSubmit={handleReviewPost} className="add-review__form" >
      {isErrorResponse && <div className="add-review__text"><p>Error Revive not post </p></div>}
      <RatingStar ratingFilm= {userRating} setUserRating = {(ratingValue:number)=>setUserRating(ratingValue)}/>
      <div className="add-review__text">
        <ReviewTextarea handleStateUpdate={updateStateHandler} comment={comment}/>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isFilled() ? isLoading : !isLoading}>
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
export {AddReviewForm};
