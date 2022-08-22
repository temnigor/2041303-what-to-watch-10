import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviveAction } from '../../store/api-action';
import { getIsErrorResponse } from '../../store/data-api-process/selectors';
import { RatingStar } from '../rating-star/rating-star';
import { ReviewTextarea } from '../review-textarea/review-textarea';

type AddReviewFormProps = {
id:number,
rating:number
}

function AddReviewForm ({id, rating}:AddReviewFormProps){
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const ratingForServer = Math.floor(rating);
  const updateStateHandler = (evt:FormEvent<HTMLTextAreaElement>):void => {
    evt.preventDefault();
    setComment(evt.currentTarget.value);
  };

  const postReviewHandler = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(comment.length === 0 ) {
      return;
    }
    dispatch(postReviveAction({comment, rating:ratingForServer, id}));
  };
  return(
    <form action="#" onSubmit={postReviewHandler} className="add-review__form">
      {isErrorResponse && <div className="add-review__text"><p>Error Revive not post </p></div>}
      <RatingStar ratingFilm= {rating}/>
      <div className="add-review__text">
        <ReviewTextarea updateStateHandler={updateStateHandler} comment={comment}/>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
export {AddReviewForm};
