import { AppRoute, NavMenuMoviePage } from '../../const';
import { Film } from '../../types/film';
import { Navigate } from 'react-router-dom';
import { OverviewTab } from './overview-tab';
import { DetailsTab } from './details-tab';
import { ReviewsTab } from './reviews-tab';
import { Review } from '../../types/review';

type AllTabsProps = {
  filmForPage:Film,
  nameButton:string,
  reviews:Review[]
}

function AllTabs ({filmForPage, nameButton, reviews}:AllTabsProps):JSX.Element{
  const {
    rating,
    ratingCount,
    description,
    director,
    starring,
    runTime,
    genre,
    yearCreation
  } = filmForPage;
  switch (nameButton){
    case NavMenuMoviePage.OVERVIEW:
      return (
        <OverviewTab
          rating={rating}
          ratingCount={ratingCount}
          description={description}
          director={director}
          starring={starring}
        />);
    case NavMenuMoviePage.DETAILS:
      return (
        <DetailsTab director={director}
          starring={starring}
          runTime={runTime}
          genre={genre}
          yearCreation={yearCreation}
        />);
    case NavMenuMoviePage.REVIEWS:
      return <ReviewsTab reviews={reviews} />;
    default:
      return <Navigate to={AppRoute.Error} />;
  }
}

export {AllTabs};

