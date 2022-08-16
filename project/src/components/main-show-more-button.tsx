const SLICE_STEP = 8;
type MainShowMoreButtonProps = {
  setSlice: (slice: number) => void,
  sliceEnd: number,
  filmCount:number
  }
function MainShowMoreButton ({setSlice, sliceEnd, filmCount}:MainShowMoreButtonProps) {

  return(
    <div className="catalog__more">
      {sliceEnd >= filmCount || filmCount === 0
        ? null
        :
        <button className="catalog__button" type="button" onClick={()=>{
          const slice = sliceEnd + SLICE_STEP;
          filmCount < slice
            ? setSlice(filmCount)
            : setSlice(slice);
        }}
        >
    Show more
        </button>}
    </div>
  );
}
export {MainShowMoreButton};
