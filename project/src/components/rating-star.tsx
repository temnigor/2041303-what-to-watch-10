import React from 'react';

type RatingStarProps = {
  ratingFilm : number
}
function RatingStar ({ratingFilm}:RatingStarProps):JSX.Element {
  const ratingValue = Math.floor(ratingFilm);
  return (
    <div className="rating" >
      <div className="rating__stars">
        {Array.from({length:10}, (_, i) => i).reverse().map((index) => {
          const star = `star-${++index}`;
          return (
            <React.Fragment key={star}>
              <input
                className="rating__input"
                id= {star}
                type="radio"
                name="rating"
                value={String(index)}
                checked={ratingValue === index}
                readOnly
              />
              <label className="rating__label" htmlFor={star}> Rating {index} </label>
            </React.Fragment>
          );
        }
        )}
      </div>
    </div>
  );
}
export {RatingStar};
