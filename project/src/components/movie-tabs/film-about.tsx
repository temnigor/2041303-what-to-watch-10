import { AppRoute, NavMenuMoviePage } from '../../const';
import { Review } from '../../types/review';
import { Film } from '../../types/film';
import { Navigate } from 'react-router-dom';
import { Overview } from './overview';
import { Details } from './details';
import { Reviews } from './reviews';


type FilmAboutProps = {
  filmForPage:Film,
  nameButton:string,
  reviews: Review[]
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
      return <Reviews reviews={props.reviews}/>;
    default:
      return <Navigate to = {AppRoute.Error} />;
  }

}

export {FilmAbout};

