import { Fragment, useEffect, useRef, useState } from 'react';
import { TIME_VIDEO_LAG } from '../const';
type PlayerSmallFilmProps = {
  previewImage:string,
  videoLink:string,
  id:string
}
function PlayerSmallFilm (props:PlayerSmallFilmProps):JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  return (
    <Fragment>
      {isPlaying && <button className = "small-film-card__link " onClick={() => setIsMuted(!isMuted)}>Mute</button>}

      <div id = {props.id} className = "small-film-card__image"
        onMouseMove={(evt)=> evt.currentTarget.id === props.id && setTimeout(() => {setIsPlaying(true); setIsReload(false);},TIME_VIDEO_LAG)}
        onMouseOut={()=>setTimeout( () => {setIsPlaying(false); setIsReload(true);},TIME_VIDEO_LAG)}
      >
        <video ref = {videoRef} muted = {isMuted} src= {props.videoLink} preload="metadata" poster={props.previewImage} width="280" height="175">
        </video>
      </div>
    </Fragment>
  );
}
export {PlayerSmallFilm};
