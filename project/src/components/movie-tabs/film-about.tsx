import { AppRoute, NavMenuMoviePage } from '../../const';
import { Film } from '../../types/film';
import { Navigate } from 'react-router-dom';
import { Overview } from './overview';
import { Details } from './details';
import { Comments } from './comments';
import { Reviews } from '../../types/review';

type FilmAboutProps = {
  filmForPage:Film,
  nameButton:string,
  reviews:Reviews[]
}

function FilmAbout (props:FilmAboutProps):JSX.Element{
  switch (props.nameButton){
    case NavMenuMoviePage.OVERVIEW:
      return (
        <Overview
          rating = {props.filmForPage.rating}
          ratingCount = {props.filmForPage.ratingCount}
          description = {props.filmForPage.description}
          director = {props.filmForPage.director}
          starring = {props.filmForPage.starring}
        />);
    case NavMenuMoviePage.DETAILS:
      return (
        <Details director = {props.filmForPage.director}
          starring = {props.filmForPage.starring}
          runTime = {props.filmForPage.runTime}
          genre = {props.filmForPage.genre}
          yearCreation = {props.filmForPage.yearCreation}
        />);
    case NavMenuMoviePage.REVIEWS:
      return <Comments reviews={props.reviews} />;
    default:
      return <Navigate to = {AppRoute.Error} />;
  }
}

export {FilmAbout};

