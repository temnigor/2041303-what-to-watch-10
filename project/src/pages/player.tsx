import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ArtBoard from '../components/art-board/art-board';
import { Spinier } from '../components/spinier/spinier';
import { PlayPauseButton } from '../components/player-pause-button/player-pause-button';
import { AppRoute } from '../const';
import {useAppSelector } from '../hooks';
import { getAllFilms } from '../store/data-api-process/selectors';
import { filmTogglePlayer, getFilmTime } from '../utils';

function Player () {
  const {id:idParam} = useParams();
  const allFilms = useAppSelector(getAllFilms);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isGoingPlay, setIsGoingPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeFilmEnd, setTimeFilmEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const timeCounterToEnd = getFilmTime(timeFilmEnd, currentTime);
  const filmToggleStep = filmTogglePlayer(timeFilmEnd, currentTime);

  useEffect(
    ()=> {

      if(videoRef.current === null) {
        return;
      }

      if(!isGoingPlay){
        videoRef.current.play();
        setInterval(()=>{if(videoRef.current !== null){setCurrentTime(videoRef.current.currentTime);}},100);
      }
      if(isGoingPlay){
        videoRef.current.pause();
      }

      setCurrentTime(videoRef.current.currentTime);
      setTimeFilmEnd(videoRef.current.duration);
    }, [isGoingPlay, timeFilmEnd, currentTime]
  );

  if(!idParam){
    return <Navigate to={AppRoute.Error}/>;
  }
  const idParamNum = parseInt(idParam, 10);
  if(isNaN(idParamNum)){
    return <Navigate to={AppRoute.Error}/>;
  }
  const vouchFilm = allFilms.find((film)=> film.id === idParamNum);
  if(vouchFilm === undefined){
    return <Navigate to={AppRoute.Error}/>;
  }
  const {videoLinkPlayer, bigPoster, filmName} = vouchFilm;
  return (
    <div>
      <ArtBoard/>
      <div className ="player" >
        {isLoading && <Spinier/>}
        <video ref={videoRef} src={videoLinkPlayer}
          onCanPlay={()=>{if(isLoading === false){setIsLoading(true);}}}
          onPlaying={()=>{if(isLoading === true){setIsLoading(false);}}}
          onLoadedData={()=>{if(isLoading === true){setIsLoading(false);}}}
          onDoubleClick ={()=>{
            if(document.fullscreenElement !== null){
              document.exitFullscreen();
            }}}
          preload="metadata" className ="player__video" poster={bigPoster}
        >
        </video>
        <Link type="button" className ="player__exit" to={AppRoute.Film.replace(':id', `${idParamNum}`)}>Exit</Link>
        <div className ="player__controls">
          <div className ="player__controls-row">
            <div className ="player__time">
              <progress className ="player__progress" value={currentTime} max= {`${timeFilmEnd}`}></progress>
              <div className ="player__toggler" style = {{left: `${filmToggleStep}%`}} >Toggler</div>
            </div>
            <div className ="player__time-value">{timeCounterToEnd}</div>
          </div>
          <div className ="player__controls-row">
            <button type="button" className ="player__play" onClick={()=>setIsGoingPlay(!isGoingPlay)}>
              <PlayPauseButton isGoingPlay = {isGoingPlay} />
            </button>
            <div className ="player__name">{filmName}</div>
            <button onClick={()=>{
              if(document.fullscreenElement === null){
                videoRef.current?.requestFullscreen();
              }
            }} type="button" className ="player__full-screen"
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
