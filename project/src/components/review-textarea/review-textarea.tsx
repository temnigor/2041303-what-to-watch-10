import { FormEvent } from 'react';

type ReviewTextareaProps = {
  handleStateUpdate:(evt: FormEvent<HTMLTextAreaElement>) => void,
  comment:string
}

export function ReviewTextarea ({handleStateUpdate, comment}:ReviewTextareaProps) {
  return <textarea onChange={handleStateUpdate} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={comment} ></textarea>;
}
