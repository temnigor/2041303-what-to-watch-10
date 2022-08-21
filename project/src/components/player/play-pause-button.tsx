type PlayPauseProps = {
  isGoingPlay:boolean
}
export function PlayPauseButton ({isGoingPlay}:PlayPauseProps):JSX.Element {
  return(isGoingPlay)
    ?
    <>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </>
    :
    <>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </>;
}
