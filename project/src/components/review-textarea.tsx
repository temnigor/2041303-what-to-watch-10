import { FormEvent } from "react";

type ReviewTextareaProps = {
  updateStateHandler:(evt: FormEvent<HTMLTextAreaElement>) => void,
  comment:string
}

export function ReviewTextarea ({updateStateHandler, comment}:ReviewTextareaProps) {
  return <textarea onChange={updateStateHandler} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={comment} ></textarea>;
}
