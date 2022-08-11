import { Navigate, useParams } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";
import { getDataMoviePageAction } from "../../store/api-action";
import { LoadingScreen } from "./loading-screen";

type LoadingScreenPageProps = {
  loadingFilms:boolean,
  children:JSX.Element
}
export function LoadingScreenPage(props:LoadingScreenPageProps) {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  if(id === undefined){
    return <Navigate to={AppRoute.Error}/>;
  }
  console.log({id})
  dispatch(getDataMoviePageAction({id}));
  console.log(props.loadingFilms)

  return props.loadingFilms ? <LoadingScreen/> : props.children;

}
