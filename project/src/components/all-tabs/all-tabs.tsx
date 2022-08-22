import { AppRoute, NavMenuMoviePage } from '../../const';
import { Film } from '../../types/film';
import { Navigate } from 'react-router-dom';
import { OverviewTab } from './overview-tab';
import { DetailsTab } from './details-tab';
import { ReviewsTab } from './reviews-tab';
import { Review } from '../../types/review';
import { useAppSelector } from '../../hooks';
import { getTabsMeaning } from '../../store/filter-process/selectors';

type AllTabsProps = {
  filmForPage:Film,
  reviews:Review[]
}

function AllTabs ({filmForPage, reviews}:AllTabsProps):JSX.Element{
  const tabsMeaning = useAppSelector(getTabsMeaning);
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
  switch (tabsMeaning){
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

