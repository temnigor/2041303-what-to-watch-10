import { getRating } from '../mocks/films';
type OverviewProps = {
  rating:number,
  ratingCount:number,
  director:string,
  starring: string[],
  description:string
}
function Overview (props:OverviewProps):JSX.Element{
  const filmCardStarring = props.starring.slice(0, 5).map((actor:string) => `${actor}, `);
  filmCardStarring[filmCardStarring.length - 1] = `${filmCardStarring[filmCardStarring.length - 1]} and other`;
  return (
    <>
      <div className ="film-rating">
        <div className ="film-rating__score">{props.rating}</div>
        <p className ="film-rating__meta">
          <span className ="film-rating__level">{getRating(props.rating)}</span>
          <span className ="film-rating__count">{props.ratingCount} ratings</span>
        </p>
      </div>
      <div className ="film-card__text">
        {props.description}
        <p className ="film-card__director"><strong>Director: {props.director}</strong></p>

        <p className ="film-card__starring"><strong>Starring: {filmCardStarring} </strong></p>
      </div>
    </>
  );
}
export {Overview};
