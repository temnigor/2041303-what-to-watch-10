import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PlayerSmallFilmProps = {
  previewImage:string,
  videoLink:string,
  id:string
}
const TIME_VIDEO_LAG = 1000;

function PlayerSmallFilm ({ previewImage, videoLink, id}:PlayerSmallFilmProps):JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const filmLink = useNavigate();
  useEffect(() => {
    if(videoRef.current === null) {
      return;
    }
    if (isPlaying) {
      videoRef.current.play();
      return;
    }
    if(isReload){
      videoRef.current.load();
    }
  }, [isPlaying, isReload]);

  const setPlay = useCallback((evt:MouseEvent<HTMLElement>) => {
    evt.currentTarget.id === id && setTimeout(() => {setIsPlaying(true); setIsReload(false);},TIME_VIDEO_LAG);
  },[id] );

  const setReload = useCallback(()=> setTimeout( () => {setIsPlaying(false); setIsReload(true);},TIME_VIDEO_LAG),[]);

  return (
    <div
      id = {id}
      className = "small-film-card__image"
      onMouseMove={(evt)=>setPlay(evt)}
      onMouseOut={()=>setReload()}
      onClick = {()=>{filmLink(AppRoute.Film.replace(':id', id));}}
    >
      <video ref = {videoRef} muted src= {videoLink} preload="metadata" poster={previewImage} width="280" height="175">
      </video>
    </div>
  );
}
export {PlayerSmallFilm};
