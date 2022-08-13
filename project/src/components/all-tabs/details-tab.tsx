import { getRunTimeToString } from '../../utils';

type DetailsProps = {
  director:string,
  starring:string[],
  runTime: number,
  genre:string,
  yearCreation : string,
}

function DetailsTab ({director, genre, yearCreation, starring, runTime}:DetailsProps):JSX.Element {
  const isLastStarring = (actor:string) => actor === starring[starring.length - 1];
  const runTimeNormal = getRunTimeToString(runTime);
  const starringDetails = starring.map((actor,i) => {
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
            <span className="film-card__details-value">{director}</span>
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
            <span className="film-card__details-value">{runTimeNormal}</span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Genre</strong>
            <span className="film-card__details-value"> {genre} </span>
          </p>
          <p className="film-card__details-item">
            <strong className="film-card__details-name">Released</strong>
            <span className="film-card__details-value">{yearCreation}</span>
          </p>
        </div>
      </div>
      <div/>
    </>
  );
}

export {DetailsTab};
