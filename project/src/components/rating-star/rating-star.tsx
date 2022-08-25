import React from 'react';

type RatingStarProps = {
  ratingFilm: number
  setUserRating: (rating:number)=>void
}
function RatingStar ({ratingFilm, setUserRating}:RatingStarProps):JSX.Element {
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
                checked={ratingFilm === index}
                readOnly
                onClick={()=>{setUserRating(index);}}
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
