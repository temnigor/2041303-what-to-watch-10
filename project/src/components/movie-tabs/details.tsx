type DetailsProps = {
  director:string,
  starring:string[],
  runTime: string,
  genre:string,
  yearCreation : string,
}

function Details (props:DetailsProps):JSX.Element {
  const isLastStarring = (actor:string) => actor === props.starring[props.starring.length - 1];
  const starringDetails = props.starring.map((actor,i) => {
    const keyId = `details-${i}`;
    return (
      isLastStarring(actor)
        ? (<span key= {keyId}> {`${actor}`}</span>)
        : (<span key= {keyId}> {`${actor},`}<br/> </span>)
    );
  }
  );
  return (
    <>
      <div className="film-card__text film-card__row">
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Director</strong>
            <span className="film-card__details-value">{props.director}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Starring</strong>
            <span className="film-card__details-value">
              {starringDetails}
            </span>
          </p>

        </div>
        <div className="film-card__text-col">
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Run Time</strong>
            <span className="film-card__details-value">{props.runTime}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value"> {props.genre} </span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">{props.yearCreation}</span>
          </p>
        </div>
      </div>
      <div/>
    </>
  );
}

export {Details};
