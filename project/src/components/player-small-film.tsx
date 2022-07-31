import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

type PlayerSmallFilmProps = {
  previewImage:string,
  videoLink:string,
  id:string
}
const TIME_VIDEO_LAG = 1000;

function PlayerSmallFilm (props:PlayerSmallFilmProps):JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

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
    evt.currentTarget.id === props.id && setTimeout(() => {setIsPlaying(true); setIsReload(false);},TIME_VIDEO_LAG);
  },[props.id] );

  const setReload = useCallback(()=> setTimeout( () => {setIsPlaying(false); setIsReload(true);},TIME_VIDEO_LAG),[]);

  return (
    <div
      ref={divRef}
      id = {props.id}
      className = "small-film-card__image"
      onMouseMove={(evt)=>setPlay(evt)}
      onMouseOut={()=>setReload()}
    >
      <video ref = {videoRef} muted src= {props.videoLink} preload="metadata" poster={props.previewImage} width="280" height="175">
      </video>
    </div>
  );
}
export {PlayerSmallFilm};
