import { FormEvent, useEffect, useState } from 'react';
import { TIME_CLEAR_ERROR } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviveAction } from '../../store/api-action';
import { setIsErrorResponseAction } from '../../store/data-api-process/data-api-process';
import { getIsErrorResponse} from '../../store/data-api-process/selectors';
import { RatingStar } from '../rating-star/rating-star';

const MAX_COMMENT_LENGTH = 400;
const MIN_COMMENT_LENGTH = 50;

type AddReviewFormProps = {
id:number,
}

function AddReviewForm ({id}:AddReviewFormProps){
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(isErrorResponse){
      setTimeout(()=>dispatch(setIsErrorResponseAction(false)), TIME_CLEAR_ERROR);
      setIsLoading(false);
    }
    if(isLoading){
      dispatch(postReviveAction({comment, rating:userRating, id}));
    }
  },[dispatch, isErrorResponse, comment, userRating, isLoading, id]);

  const isFilled = ()=>{
    if(comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && userRating !== 0 ){
      return true;
    }
    return false;
  };
  const handleTextUpdate = (evt:FormEvent<HTMLTextAreaElement>):void => {
    evt.preventDefault();
    setComment(evt.currentTarget.value);
  };

  const handleReviewPost = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(comment.length < MIN_COMMENT_LENGTH || comment.length > MAX_COMMENT_LENGTH ) {
      return;
    }
    setIsLoading(true);
  };
  return(
    <form action="#" onSubmit={handleReviewPost} className="add-review__form" >
      {isErrorResponse && <div className="add-review__text"><p>Error Revive not post </p></div>}
      <RatingStar isLoading={isLoading} ratingFilm= {userRating} setUserRating = {(ratingValue:number)=>setUserRating(ratingValue)}/>
      <div className="add-review__text">
        <textarea onChange={handleTextUpdate} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={comment} disabled={isLoading} ></textarea>
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
